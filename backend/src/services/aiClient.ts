import type { InsertArticleInput } from '../models/articleModel.js';

type GeneratedArticle = InsertArticleInput & {
  meta: {
    provider: string;
    apiKeyUsed: boolean;
  };
};

const loremParagraphs = [
  'A inteligência artificial vem transformando o cenário tecnológico com inovações que ampliam a produtividade e a criatividade das equipes.',
  'Ao combinar análise de dados com modelos avançados, é possível gerar insights que antes demandavam semanas de trabalho manual.',
  'Para aproveitar esse movimento, empresas têm investido em automação, boas práticas de engenharia e uma cultura de experimentação constante.',
  'Mesmo com ferramentas poderosas, o papel humano segue essencial: orientar, revisar e alinhar a tecnologia às necessidades reais do negócio.',
];

const pickSampleParagraphs = () => {
  const shuffled = [...loremParagraphs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).join('\n\n');
};

export const generateArticle = async (topic?: string | null): Promise<GeneratedArticle> => {
  const provider = process.env.AI_PROVIDER || 'placeholder';
  const apiKey = process.env.AI_API_KEY || '';
  const subject = topic || 'Tendências de tecnologia e produtividade';

  // TODO: Substituir o gerador fictício por uma chamada real de IA (OpenAI, Anthropic, Hugging Face, etc.).
  // - Exemplo com OpenAI: utilizar a API de chat completions, enviando o tópico como prompt.
  // - Usar AI_API_KEY para autenticação e uma URL de endpoint (definir via variável de ambiente).
  // - Tratar timeouts, limites de tokens e custos conforme o provedor escolhido.
  // - Permitir configurar o provider via AI_PROVIDER, escolhendo o cliente adequado.

  const title = `Insights sobre ${subject}`;
  const content = pickSampleParagraphs();

  // Estrutura esperada por articleService para persistência.
  return {
    title,
    content,
    topic: topic || null,
    source: provider,
    meta: {
      provider,
      apiKeyUsed: Boolean(apiKey),
    },
  };
};
