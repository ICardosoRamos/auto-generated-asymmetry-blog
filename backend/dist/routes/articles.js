import express from 'express';
import { getAllArticles, getArticleById } from '../models/articleModel.js';
import { generateAndStoreArticle } from '../services/articleService.js';
const router = express.Router();
router.get('/', async (_req, res) => {
    try {
        const articles = await getAllArticles();
        res.json(articles);
    }
    catch (error) {
        console.error('Error fetching articles', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const article = await getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    }
    catch (error) {
        console.error('Error fetching article', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/generate', async (req, res) => {
    const adminSecret = process.env.ADMIN_SECRET || '';
    const incomingSecret = req.headers['x-admin-secret'];
    if (!adminSecret || incomingSecret !== adminSecret) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const { topic } = (req.body || {});
        const article = await generateAndStoreArticle(topic);
        res.status(201).json(article);
    }
    catch (error) {
        console.error('Error generating article', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default router;
