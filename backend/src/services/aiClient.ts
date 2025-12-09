import axios from "axios";
import type { InsertArticleInput } from "../models/articleModel.js";

type GeneratedArticle = InsertArticleInput & {
  meta: {
    provider: string;
    apiKeyUsed: boolean;
  };
};

const loremParagraphs = [
  "A inteligência artificial vem transformando o cenário tecnológico com inovações que ampliam a produtividade e a criatividade das equipes.",
  "Ao combinar análise de dados com modelos avançados, é possível gerar insights que antes demandavam semanas de trabalho manual.",
  "Para aproveitar esse movimento, empresas têm investido em automação, boas práticas de engenharia e uma cultura de experimentação constante.",
  "Mesmo com ferramentas poderosas, o papel humano segue essencial: orientar, revisar e alinhar a tecnologia às necessidades reais do negócio.",
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
  const subject = topic || "Tendências de tecnologia e produtividade";
  const title = `Insights sobre ${subject}`;
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

  const subject = topic || "tendências de tecnologia e produtividade";

  const prompt = [
    "Gere um artigo curto e coerente em português.",
    "Use um título forte e um corpo com 3-5 parágrafos.",
    'Responda somente em JSON com as chaves "title" e "content".',
  ].join(" ");

  const payload = {
    model,
    temperature: 0.7,
    max_tokens: Number(process.env.AI_MAX_TOKENS || 700),
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente que cria artigos de blog concisos. Sempre responda apenas em JSON com as chaves title e content.",
      },
      {
        role: "user",
        content: `${prompt} Tópico: ${subject}`,
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
