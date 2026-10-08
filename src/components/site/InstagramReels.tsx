"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const reelUrls = [
  "https://www.instagram.com/reel/DOEKtLgDKAJ/",
  "https://www.instagram.com/reel/DNvyH9ixHp0/",
  "https://www.instagram.com/reel/DNQpnrLNH6j/",
];

export function InstagramReels() {
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <>
      <div className="flex gap-5 overflow-x-auto pb-4">
        {reelUrls.map((url) => (
          <blockquote
            key={url}
            className="instagram-media w-[326px] shrink-0"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
          />
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onReady={() => window.instgrm?.Embeds.process()}
      />
    </>
  );
}
