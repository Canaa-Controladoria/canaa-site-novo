import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Na Vercel o filesystem do deploy é somente-leitura (exceto /tmp), então o
// banco é copiado de um snapshot versionado para /tmp em cada cold start.
// Escritas funcionam durante a vida da instância, mas não persistem entre
// deploys/instâncias — ok para demonstração, não para uso em produção.
const DB_PATH = process.env.VERCEL
  ? seedTmpDb()
  : path.join(process.cwd(), "data", "canaa.db");

function seedTmpDb() {
  const tmpPath = path.join("/tmp", "canaa.db");
  if (!fs.existsSync(tmpPath)) {
    const seedPath = path.join(process.cwd(), "data", "seed.db");
    fs.copyFileSync(seedPath, tmpPath);
  }
  return tmpPath;
}

const DATA_DIR = path.dirname(DB_PATH);
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

declare global {
  var __canaaDb: Database.Database | undefined;
}

function createConnection() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      primary_category_slug TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft', -- draft | published
      published_at TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      seo_title TEXT,
      seo_description TEXT,
      focus_keyword TEXT,
      excerpt TEXT,
      content_html TEXT NOT NULL DEFAULT '',
      featured_image TEXT,
      reading_time_minutes INTEGER NOT NULL DEFAULT 1,
      UNIQUE(primary_category_slug, slug)
    );

    CREATE TABLE IF NOT EXISTS post_categories (
      post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      PRIMARY KEY (post_id, category_id)
    );

    CREATE TABLE IF NOT EXISTS post_tags (
      post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (post_id, tag_id)
    );

    CREATE TABLE IF NOT EXISTS post_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      viewed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);
    CREATE INDEX IF NOT EXISTS idx_post_views_viewed_at ON post_views(viewed_at);

    CREATE TABLE IF NOT EXISTS shorts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      video_path TEXT NOT NULL,
      thumbnail_path TEXT,
      status TEXT NOT NULL DEFAULT 'draft', -- draft | published
      position INTEGER NOT NULL DEFAULT 0,
      published_at TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT 'Admin'
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT NOT NULL,
      name TEXT NOT NULL,
      company TEXT,
      whatsapp TEXT,
      email TEXT,
      message TEXT,
      lgpd_consent INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export function getDb(): Database.Database {
  if (!global.__canaaDb) {
    global.__canaaDb = createConnection();
  }
  return global.__canaaDb;
}
