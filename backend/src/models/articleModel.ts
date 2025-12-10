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

export type ArticleQuery = {
  page?: number;
  limit?: number;
  topic?: string;
  search?: string;
  sort?: "recent" | "oldest";
};

const sanitizePagination = (value: number | undefined, fallback: number, max: number) => {
  if (!value || Number.isNaN(value) || value < 1) return fallback;
  return Math.min(value, max);
};

export const getArticles = async (params: ArticleQuery = {}): Promise<Article[]> => {
  const page = sanitizePagination(params.page, 1, 10_000);
  const limit = sanitizePagination(params.limit, 10, 100);
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.topic) {
    values.push(params.topic);
    conditions.push(`topic ILIKE $${values.length}`);
  }

  if (params.search) {
    const searchTerm = `%${params.search}%`;
    values.push(searchTerm, searchTerm);
    conditions.push(`(title ILIKE $${values.length - 1} OR content ILIKE $${values.length})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const order = params.sort === "oldest" ? "ASC" : "DESC";

  const result = await query<Article>(
    `SELECT id, title, content, topic, source, created_at
     FROM articles
     ${where}
     ORDER BY created_at ${order}
     LIMIT ${limit} OFFSET ${offset}`,
    values
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

export const countArticlesWithFilters = async (params: ArticleQuery = {}): Promise<number> => {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.topic) {
    values.push(params.topic);
    conditions.push(`topic ILIKE $${values.length}`);
  }

  if (params.search) {
    const searchTerm = `%${params.search}%`;
    values.push(searchTerm, searchTerm);
    conditions.push(`(title ILIKE $${values.length - 1} OR content ILIKE $${values.length})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM articles ${where}`,
    values
  );
  return Number(result.rows[0]?.count || 0);
};

export const findArticleByTitle = async (title: string): Promise<Article | undefined> => {
  const result = await query<Article>(
    `SELECT id, title, content, topic, source, created_at
     FROM articles
     WHERE LOWER(title) = LOWER($1)
     LIMIT 1`,
    [title]
  );
  return result.rows[0];
};
