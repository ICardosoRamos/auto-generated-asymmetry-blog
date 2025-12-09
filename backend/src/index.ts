import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { query } from "./config/db.js";
import { countArticles } from "./models/articleModel.js";
import { generateAndStoreArticle } from "./services/articleService.js";
import healthRouter from "./routes/health.js";
import articlesRouter from "./routes/articles.js";
import { scheduleDailyArticleJob } from "./jobs/articleJob.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);

const waitForDb = async (retries = 10, delayMs = 2000): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await query("SELECT 1");
      return;
    } catch (err) {
      const error = err as Error;
      console.warn(
        `DB not ready (attempt ${attempt}/${retries}):`,
        error.message
      );
      if (attempt === retries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

const createArticlesTable = async (): Promise<void> => {
  await query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      topic TEXT,
      source TEXT,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    )
  `);
};

const seedInitialArticles = async (minArticles = 3): Promise<void> => {
  let current = await countArticles();
  while (current < minArticles) {
    await generateAndStoreArticle();
    current += 1;
  }
};

const start = async () => {
  try {
    await waitForDb();
    await createArticlesTable();
    await seedInitialArticles();

    app.use("/health", healthRouter);
    app.use("/articles", articlesRouter);

    console.log("Database is ready and initial articles are seeded.");

    const cronExpression = process.env.ARTICLE_CRON_EXPRESSION || "** * * *";
    scheduleDailyArticleJob(cronExpression);

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

start();
