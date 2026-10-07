import "server-only";
import { client } from "@/sanity/client";

export interface ShortRecord {
  id: string;
  title: string;
  videoPath: string;
  thumbnailPath: string | null;
}

export async function listPublishedShorts(limit?: number): Promise<ShortRecord[]> {
  const shorts = await client.fetch<ShortRecord[]>(
    `*[_type == "short" && defined(video.asset)] | order(position asc, publishedAt desc) {
      "id": _id,
      title,
      "videoPath": video.asset->url,
      "thumbnailPath": thumbnail.asset->url
    }`,
  );
  return limit ? shorts.slice(0, limit) : shorts;
}
