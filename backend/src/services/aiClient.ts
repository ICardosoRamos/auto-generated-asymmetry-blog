import axios from "axios";
import type { InsertArticleInput } from "../models/articleModel.js";

type GeneratedArticle = InsertArticleInput & {
  meta: {
    provider: string;
    apiKeyUsed: boolean;
  };
};

const loremParagraphs = [
  "Artificial intelligence is reshaping the tech landscape with innovations that boost productivity and creativity across teams.",
  "By combining data analysis with advanced models, it is possible to generate insights that once required weeks of manual effort.",
  "To ride this wave, companies are investing in automation, solid engineering practices, and a culture of constant experimentation.",
  "Even with powerful tools, the human role remains essential: guiding, reviewing, and aligning technology to real business needs.",
];

const pickSampleParagraphs = () => {
  const shuffled = [...loremParagraphs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).join("\n\n");
};

const parseJsonFromText = (
  text: string
): { title: string; content: string; topic?: string } => {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  return parsed;
};

const buildFallbackArticle = (topic?: string | null): GeneratedArticle => {
  const subject = topic || "Technology trends and productivity";
  const title = `Insights about ${subject}`;
  const content = pickSampleParagraphs();

  return {
    title,
    content,
    topic: topic || null,
    source: "placeholder",
    meta: {
      provider: "placeholder",
      apiKeyUsed: false,
    },
  };
};

const generateFromOpenAI = async (
  topic?: string | null
): Promise<GeneratedArticle> => {
  const apiKey = process.env.OPENAI_API_KEY || "";
  const model = process.env.OPENAI_MODEL || "gpt-5-nano";
  const timeoutMs = Number(process.env.AI_TIMEOUT_MS || 15000);
  const baseURL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";

  console.log(`Using OpenAI model: ${model}`);
  console.log(`OpenAI base URL: ${baseURL}`);
  console.log(`OpenAI timeout (ms): ${timeoutMs}`);
  console.log(`Generating article on topic: ${topic || "default"}`);
  console.log(`API Key present: ${apiKey ? "yes" : "no"}`);

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const subject = topic || "technology trends and productivity";

  const prompt = [
    "Generate a short, coherent blog article in English.",
    "Use a strong title and a body with 3-5 paragraphs.",
    'Respond only in JSON with keys "title", "content", and optionally "topic".',
  ].join(" ");

  const payload = {
    model,
    temperature: 0.7,
    max_tokens: Number(process.env.AI_MAX_TOKENS || 700),
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that creates concise blog articles. Always reply only in JSON with keys title, content, and optionally topic.",
      },
      {
        role: "user",
        content: `${prompt} Topic: ${subject}`,
      },
    ],
  };

  const { data } = await axios.post(`${baseURL}/chat/completions`, payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    timeout: timeoutMs,
  });

  const raw = data?.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    throw new Error("OpenAI response missing content");
  }

  const parsed = parseJsonFromText(raw);
  if (!parsed.title || !parsed.content) {
    throw new Error("OpenAI response missing title or content");
  }

  return {
    title: parsed.title,
    content: parsed.content,
    topic: parsed.topic || topic || null,
    source: "openai",
    meta: {
      provider: "openai",
      apiKeyUsed: true,
    },
  };
};

export const generateArticle = async (
  topic?: string | null
): Promise<GeneratedArticle> => {
  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();

  try {
    console.log(`Generating article using provider: ${provider}`);
    if (provider === "openai") {
      return await generateFromOpenAI(topic);
    }
  } catch (error) {
    const err = error as Error;
    console.error(err);
    console.error(
      "AI generation failed, falling back to placeholder:",
      err.message
    );
  }

  return buildFallbackArticle(topic);
};
