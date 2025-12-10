import express, { Request, Response } from 'express';
import { countArticlesWithFilters, getArticles, getArticleById } from '../models/articleModel.js';
import { generateAndStoreArticle } from '../services/articleService.js';

const router = express.Router();

const parsePagination = (req: Request) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  return {
    page: page < 1 ? 1 : page,
    limit: limit < 1 ? 10 : Math.min(limit, 100),
  };
};

const parseFilters = (req: Request) => {
  const topic = typeof req.query.topic === "string" ? req.query.topic.trim() : undefined;
  const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
  const sort: "recent" | "oldest" = req.query.sort === "oldest" ? "oldest" : "recent";

  return { topic, search, sort };
};

let lastGenerationTs = 0;
const generationCooldownMs = 10_000; // simple in-memory rate limit

router.get('/', async (req: Request, res: Response) => {
  try {
    const { page, limit } = parsePagination(req);
    const { topic, search, sort } = parseFilters(req);

    const [articles, total] = await Promise.all([
      getArticles({ page, limit, topic, search, sort }),
      countArticlesWithFilters({ topic, search }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({
      data: articles,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching articles', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/generate', async (req: Request, res: Response) => {
  const adminSecret = process.env.ADMIN_SECRET || '';
  const incomingSecret = req.headers['x-admin-secret'];

  if (!adminSecret || incomingSecret !== adminSecret) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const now = Date.now();
  if (now - lastGenerationTs < generationCooldownMs) {
    return res.status(429).json({ message: 'Please wait before generating another article' });
  }

  const { topic } = (req.body || {}) as { topic?: unknown };
  if (topic !== undefined) {
    if (typeof topic !== 'string') {
      return res.status(400).json({ message: 'Topic must be a string' });
    }
    const trimmed = topic.trim();
    if (trimmed.length > 0 && (trimmed.length < 3 || trimmed.length > 80)) {
      return res
        .status(400)
        .json({ message: 'Topic must have between 3 and 80 characters when provided' });
    }
  }

  try {
    const article = await generateAndStoreArticle(topic as string | undefined);
    lastGenerationTs = now;
    res.status(201).json(article);
  } catch (error) {
    console.error('Error generating article', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
