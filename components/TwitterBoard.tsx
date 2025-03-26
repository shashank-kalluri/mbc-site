"use server";

import React, { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet as _getTweet } from "react-tweet/api";
import { tweetUrls } from "@/data/tweets";

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ["tweet"],
  { revalidate: 3600 * 24 }
);

const TweetComponent = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id);
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
};

const TweetBoard = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6">
      <h2 className="text-3xl md:text-6xl font-mono italic font-bold tracking-tight text-center mb-10">
        The MBC Fam
      </h2>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {tweetUrls.map((url, index) => (
          <div key={index} className="break-inside-avoid p-2">
            <Suspense fallback={<TweetSkeleton />}>
              <TweetComponent id={url.split("/").pop() || ""} />
            </Suspense>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TweetBoard;
