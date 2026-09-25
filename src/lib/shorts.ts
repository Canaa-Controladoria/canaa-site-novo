import "server-only";
import { getDb } from "./db";

export type ShortStatus = "draft" | "published";

export interface ShortRecord {
  id: number;
  title: string;
  videoPath: string;
  thumbnailPath: string | null;
}

interface ShortRow {
  id: number;
  title: string;
  video_path: string;
  thumbnail_path: string | null;
}

function toRecord(row: ShortRow): ShortRecord {
  return {
    id: row.id,
    title: row.title,
    videoPath: row.video_path,
    thumbnailPath: row.thumbnail_path,
  };
}

export function listPublishedShorts(limit?: number): ShortRecord[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, title, video_path, thumbnail_path FROM shorts
       WHERE status = 'published'
       ORDER BY position ASC, published_at DESC
       ${limit ? "LIMIT ?" : ""}`
    )
    .all(...(limit ? [limit] : [])) as ShortRow[];
  return rows.map(toRecord);
}
