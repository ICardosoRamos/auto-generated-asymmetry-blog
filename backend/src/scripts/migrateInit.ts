import { query } from "../config/db.js";

const run = async () => {
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

  await query(`CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles (created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_articles_topic ON articles (topic)`);
  console.log("Migrations applied (table + indexes).");
};

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Migration failed", err);
    process.exit(1);
  });
