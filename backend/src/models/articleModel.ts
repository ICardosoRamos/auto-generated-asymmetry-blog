import { query } from '../config/db.js';

export type Article = {
  id: number;
  title: string;
  content: string;
  topic: string | null;
  source: string | null;
  created_at: string;
};

export type InsertArticleInput = {
  title: string;
  content: string;
  topic?: string | null;
  source?: string | null;
};

export const getAllArticles = async (): Promise<Article[]> => {
  const result = await query<Article>(
    'SELECT id, title, content, topic, source, created_at FROM articles ORDER BY created_at DESC'
  );
  return result.rows;
};

export const getArticleById = async (id: number | string): Promise<Article | undefined> => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  const result = await query<Article>(
    'SELECT id, title, content, topic, source, created_at FROM articles WHERE id = $1',
    [numericId]
  );
  return result.rows[0];
};

export const insertArticle = async ({ title, content, topic = null, source = 'ai' }: InsertArticleInput): Promise<Article> => {
  const result = await query<Article>(
    `INSERT INTO articles (title, content, topic, source)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, content, topic, source, created_at`,
    [title, content, topic, source]
  );
  return result.rows[0];
};

export const countArticles = async (): Promise<number> => {
  const result = await query<{ count: string }>('SELECT COUNT(*) AS count FROM articles');
  return Number(result.rows[0]?.count || 0);
};
