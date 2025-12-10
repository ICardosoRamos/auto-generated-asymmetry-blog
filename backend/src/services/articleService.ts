import crypto from "crypto";
import { generateArticle } from "./aiClient.js";
import { findArticleByTitle, insertArticle } from "../models/articleModel.js";

const sanitizeText = (value: string) => value?.trim();

const isContentValid = (title?: string, content?: string) => {
  return Boolean(title && title.trim().length > 3 && content && content.trim().length > 20);
};

const buildContentHash = (content: string) =>
  crypto.createHash("sha256").update(content.trim().toLowerCase()).digest("hex");

const inMemoryHashes = new Set<string>();

export const generateAndStoreArticle = async (topic?: string | null) => {
  const aiArticle = await generateArticle(topic);

  const payload = {
    title: sanitizeText(aiArticle.title),
    content: sanitizeText(aiArticle.content),
    topic: sanitizeText(aiArticle.topic || topic || "") || null,
    source: aiArticle.source || "ai",
  };

  if (!isContentValid(payload.title, payload.content)) {
    throw new Error("Generated article missing title or content");
  }

  const maxAttempts = 3;
  let attempts = 0;
  let duplicateFound: Awaited<ReturnType<typeof findArticleByTitle>> | undefined;
  let contentHash = buildContentHash(payload.content);

  while (attempts < maxAttempts) {
    attempts += 1;

    duplicateFound = await findArticleByTitle(payload.title);
    const hashExists = inMemoryHashes.has(contentHash);

    if (!duplicateFound && !hashExists) {
      break;
    }

    // try regenerating a new article
    const retry = await generateArticle(topic);
    payload.title = sanitizeText(retry.title);
    payload.content = sanitizeText(retry.content);
    payload.topic = sanitizeText(retry.topic || topic || "") || null;
    payload.source = retry.source || "ai";
    contentHash = buildContentHash(payload.content);
  }

  if (duplicateFound && attempts >= maxAttempts) {
    return duplicateFound;
  }

  const saved = await insertArticle(payload);
  inMemoryHashes.add(contentHash);
  return saved;
};
