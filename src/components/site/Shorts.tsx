"use client";

import { useRef, useState } from "react";
import type { ShortRecord } from "@/lib/shorts";

function ShortCard({ short }: { short: ShortRecord }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-[220px] shrink-0 sm:w-[260px]">
      <button
        type="button"
        onClick={() => {
          setPlaying(true);
          videoRef.current?.play();
        }}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-box bg-navy-900"
      >
        <video
          ref={videoRef}
          src={short.videoPath}
          poster={short.thumbnailPath ?? undefined}
          controls={playing}
          playsInline
          onPause={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        {!playing && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#004b84">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        )}
      </button>
      <p className="mt-3 text-base font-bold leading-snug text-navy-800">{short.title}</p>
    </div>
  );
}

export function Shorts({ shorts }: { shorts: ShortRecord[] }) {
  if (shorts.length === 0) return null;

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {shorts.map((short) => (
        <ShortCard key={short.id} short={short} />
      ))}
    </div>
  );
}
