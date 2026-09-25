import "server-only";
import { getDb } from "./db";
import type { ShortStatus } from "./shorts";

export interface AdminShortInput {
  title: string;
  videoPath: string;
  thumbnailPath?: string | null;
  status: ShortStatus;
  position: number;
  publishedAt?: string | null;
}

export interface AdminShortRow {
  id: number;
  title: string;
  video_path: string;
  thumbnail_path: string | null;
  status: ShortStatus;
  position: number;
  published_at: string | null;
  updated_at: string;
}

export function listAllShortsAdmin() {
  const db = getDb();
  return db.prepare(`SELECT * FROM shorts ORDER BY position ASC, id DESC`).all() as AdminShortRow[];
}

export function getShortByIdAdmin(id: number) {
  const db = getDb();
  return (db.prepare(`SELECT * FROM shorts WHERE id = ?`).get(id) as AdminShortRow | undefined) ?? null;
}

export function createShort(input: AdminShortInput): number {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO shorts (title, video_path, thumbnail_path, status, position, published_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
    )
    .run(
      input.title,
      input.videoPath,
      input.thumbnailPath || null,
      input.status,
      input.position,
      input.status === "published" ? input.publishedAt || new Date().toISOString() : null
    );
  return Number(result.lastInsertRowid);
}

export function updateShort(id: number, input: AdminShortInput) {
  const db = getDb();
  const existing = db.prepare(`SELECT published_at FROM shorts WHERE id = ?`).get(id) as
    | { published_at: string | null }
    | undefined;
  if (!existing) throw new Error("Short não encontrado");

  const publishedAt =
    input.status === "published" ? input.publishedAt || existing.published_at || new Date().toISOString() : null;

  db.prepare(
    `UPDATE shorts SET
      title = ?, video_path = ?, thumbnail_path = ?, status = ?, position = ?,
      published_at = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(input.title, input.videoPath, input.thumbnailPath || null, input.status, input.position, publishedAt, id);
}

export function deleteShort(id: number) {
  const db = getDb();
  db.prepare(`DELETE FROM shorts WHERE id = ?`).run(id);
}
