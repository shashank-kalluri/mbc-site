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
    <section className="w-full py-16 text-white">
      {/* — everything inside this wrapper now — */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* heading + button */}
        <div className="flex flex-wrap items-end justify-between gap-y-4 px-4">
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter">
              What are people saying
            </h2>
            <h3 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              about MBC 2024
            </h3>
          </div>
          <a
            href="https://x.com/MBC_Conference"
            target="_blank"
            className="inline-block bg-white text-black font-semibold text-base px-5 py-2.5 rounded-xl shadow hover:bg-gray-200 transition"
          >
            Explore more highlights
          </a>
        </div>

        {/* add some breathing room */}
        <div className="mt-8">
          {/* mobile carousel */}
          <div className="block md:hidden overflow-x-auto">
            <div className="flex gap-4">
              {tweets.map((t, idx) => (
                <div
                  key={idx}
                  className="min-w-[70vw] shrink-0 scale-[0.85] origin-top p-2"
                >
                  {t ? (
                    <div data-theme="dark">
                      <EmbeddedTweet tweet={t} />
                    </div>
                  ) : (
                    <div className="p-4 text-center text-white">
                      <TweetNotFound />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* desktop masonry */}
          <div className="hidden md:block mt-8">
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {tweets.map((t, idx) => (
                <div
                  key={idx}
                  className="break-inside-avoid overflow-hidden scale-[0.92] hover:scale-[0.95] origin-top p-2 transition-transform"
                >
                  {t ? (
                    <div data-theme="dark">
                      <EmbeddedTweet tweet={t} />
                    </div>
                  ) : (
                    <div className="p-4 text-center text-white">
                      <TweetNotFound />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
