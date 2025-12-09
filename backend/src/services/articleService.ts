import { generateArticle } from './aiClient.js';
import { insertArticle } from '../models/articleModel.js';

export const generateAndStoreArticle = async (topic?: string | null) => {
  const aiArticle = await generateArticle(topic);
  const payload = {
    title: aiArticle.title,
    content: aiArticle.content,
    topic: aiArticle.topic || topic || null,
    source: aiArticle.source || 'ai',
  };

  const saved = await insertArticle(payload);
  return saved;
};
