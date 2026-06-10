import React from "react";
import { getTweet, type Tweet as TweetData } from "react-tweet/api";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { tweetUrls } from "@/data/tweets";

function normalizeEntities(obj: { entities?: TweetData["entities"] | null }) {
  if (!obj.entities) {
    (obj as TweetData).entities = {
      hashtags: [],
      urls: [],
      user_mentions: [],
      symbols: [],
    };
  } else {
    const e = obj.entities;
    if (!e.hashtags) e.hashtags = [];
    if (!e.urls) e.urls = [];
    if (!e.user_mentions) e.user_mentions = [];
    if (!e.symbols) e.symbols = [];
  }
}

async function fetchAllTweets(): Promise<(TweetData | undefined)[]> {
  return Promise.all(
    tweetUrls.map(async (url) => {
      const id = url.split("/").pop()!;
      try {
        const tweet = await getTweet(id, { next: { revalidate: 86400 } });
        if (!tweet) return undefined;
        normalizeEntities(tweet);
        if (tweet.quoted_tweet) normalizeEntities(tweet.quoted_tweet);
        if (tweet.parent) normalizeEntities(tweet.parent);
        return tweet;
      } catch {
        return undefined;
      }
    })
  );
}

export default async function TweetBoard() {
  const tweets = (await fetchAllTweets()).filter(
    (t): t is TweetData => t !== undefined
  );

  return (
    <section className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-y-4 mb-10">
          <div>
            <p className="text-[#EC8644] text-xs font-semibold uppercase tracking-widest mb-3">
              Social Buzz
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#293C4B] tracking-tight">
              What people are saying
            </h2>
            <p className="mt-1 text-[#9CADB7] text-sm">about UBC 2024</p>
          </div>
          <a
            href="https://x.com/MBC_Conference"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#293C4B] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#1A2834] transition-colors shadow-sm"
          >
            Explore highlights →
          </a>
        </div>

        {/* Mobile carousel */}
        <div className="block md:hidden overflow-x-auto -mx-6 px-6">
          <div className="flex gap-4 pb-2">
            {tweets.map((t, idx) => (
              <div
                key={idx}
                className="min-w-[78vw] shrink-0 scale-[0.92] origin-top"
              >
                {t ? (
                  <div data-theme="light">
                    <EmbeddedTweet tweet={t} />
                  </div>
                ) : (
                  <div className="p-4 text-center text-[#9CADB7]">
                    <TweetNotFound />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop masonry */}
        <div className="hidden md:block">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {tweets.map((t, idx) => (
              <div
                key={idx}
                className="break-inside-avoid overflow-hidden scale-[0.94] hover:scale-[0.97] origin-top transition-transform duration-200 mb-2"
              >
                {t ? (
                  <div data-theme="light">
                    <EmbeddedTweet tweet={t} />
                  </div>
                ) : (
                  <div className="p-4 text-center text-[#9CADB7]">
                    <TweetNotFound />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
