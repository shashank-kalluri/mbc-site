import React from "react";
import { getTweet, type Tweet as TweetData } from "react-tweet/api";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { tweetUrls } from "@/data/tweets";

async function fetchAllTweets(): Promise<(TweetData | undefined)[]> {
  return Promise.all(
    tweetUrls.map(async (url) => {
      const id = url.split("/").pop()!;
      try {
        return await getTweet(id, { next: { revalidate: 86400 } });
      } catch {
        return undefined;
      }
    })
  );
}

export default async function TweetBoard() {
  const tweets = await fetchAllTweets();

  return (
    <section className="w-full py-16 px-4 sm:px-6">
      <h2 className="text-5xl md:text-6xl text-maize font-mono italic font-bold tracking-tight text-center mb-12">
        MBC 2024 Highlights
      </h2>

      {/* Mobile carousel */}
      <div className="block md:hidden overflow-x-auto">
        <div className="flex gap-4 w-max px-1">
          {tweets.map((t, idx) => (
            <div
              key={idx}
              className="min-w-[70vw] max-w-[70vw] scale-[0.85] origin-top shrink-0"
            >
              {t ? (
                <div data-theme="dark">
                  <EmbeddedTweet tweet={t} />
                </div>
              ) : (
                <div className="p-4 text-white text-center">
                  <TweetNotFound />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Masonry grid for larger screens with scale but no outer padding */}
      <div className="hidden md:block">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4">
          {tweets.map((t, idx) => (
            <div
              key={idx}
              className="break-inside-avoid overflow-hidden scale-[0.92] transition-transform hover:scale-[0.95] origin-top"
            >
              {t ? (
                <div data-theme="dark">
                  <EmbeddedTweet tweet={t} />
                </div>
              ) : (
                <div className="p-4 text-white text-center">
                  <TweetNotFound />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
