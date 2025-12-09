import { query } from '../config/db.js';
export const getAllArticles = async () => {
    const result = await query('SELECT id, title, content, topic, source, created_at FROM articles ORDER BY created_at DESC');
    return result.rows;
};
export const getArticleById = async (id) => {
    const numericId = Number(id);
    if (Number.isNaN(numericId))
        return undefined;
    const result = await query('SELECT id, title, content, topic, source, created_at FROM articles WHERE id = $1', [numericId]);
    return result.rows[0];
};
export const insertArticle = async ({ title, content, topic = null, source = 'ai' }) => {
    const result = await query(`INSERT INTO articles (title, content, topic, source)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, content, topic, source, created_at`, [title, content, topic, source]);
    return result.rows[0];
};
export const countArticles = async () => {
    const result = await query('SELECT COUNT(*) AS count FROM articles');
    return Number(result.rows[0]?.count || 0);
};
