"use client";

import Image from "next/image";

export type TweetCard = {
  id: string;
  text: string;
  name: string;
  handle: string;
  avatar: string;
  images?: string[];
};

function Card({ tweet }: { tweet: TweetCard }) {
  return (
    <a
      href={`https://x.com/${tweet.handle}/status/${tweet.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-72 min-h-[180px] bg-white rounded-2xl p-5 border border-[#293C4B]/8 mx-3 block hover:border-[#EC8644]/40 transition-colors duration-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={tweet.avatar}
          alt={tweet.name}
          width={36}
          height={36}
          className="rounded-full"
          unoptimized
        />
        <div className="min-w-0">
          <p className="text-[#293C4B] font-semibold text-sm leading-tight truncate">{tweet.name}</p>
          <p className="text-[#9CADB7] text-xs">@{tweet.handle}</p>
        </div>
        <svg className="ml-auto shrink-0 w-4 h-4 text-[#9CADB7]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z" />
        </svg>
      </div>
      <p className="text-[#293C4B] text-sm leading-relaxed line-clamp-4">{tweet.text}</p>
      {tweet.images && tweet.images.length > 0 && (
        <div className={`mt-3 grid gap-1 rounded-xl overflow-hidden ${tweet.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {tweet.images.map((src, i) => (
            <div key={i} className="relative aspect-video">
              <Image src={src} alt="" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      )}
    </a>
  );
}

function Row({ tweets, direction }: { tweets: TweetCard[]; direction: "left" | "right" }) {
  const doubled = [...tweets, ...tweets];
  return (
    <div className="relative overflow-hidden">
      {/* Fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F4F3EF] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F4F3EF] to-transparent z-10 pointer-events-none" />
      <div
        className={`flex ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.id}-${i}`} tweet={t} />
        ))}
      </div>
    </div>
  );
}

export default function ScrollingTweets({ tweets }: { tweets: TweetCard[] }) {
  const mid = Math.ceil(tweets.length / 2);
  const row1 = tweets.slice(0, mid);
  const row2 = tweets.slice(mid);

  return (
    <div className="space-y-4">
      <Row tweets={row1} direction="left" />
      <Row tweets={row2} direction="right" />
    </div>
  );
}
