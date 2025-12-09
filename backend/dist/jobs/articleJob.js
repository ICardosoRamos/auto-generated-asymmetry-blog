import cron from 'node-cron';
import { generateAndStoreArticle } from '../services/articleService.js';
export const scheduleDailyArticleJob = (cronExpression) => {
    const expression = cronExpression || '0 9 * * *';
    return cron.schedule(expression, async () => {
        console.log(`[cron] Starting daily article generation at ${new Date().toISOString()}`);
        try {
            const article = await generateAndStoreArticle();
            console.log(`[cron] Article created with id=${article.id}`);
        }
        catch (error) {
            console.error('[cron] Failed to generate article', error);
        }
    });
};
