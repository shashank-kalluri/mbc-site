import { getTweet, type Tweet as TweetData } from "react-tweet/api";
import { tweetUrls } from "@/data/tweets";
import ScrollingTweets, { type TweetCard } from "./ScrollingTweets";

function normalizeEntities(obj: { entities?: TweetData["entities"] | null }) {
  if (!obj.entities) {
    (obj as TweetData).entities = { hashtags: [], urls: [], user_mentions: [], symbols: [] };
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

function stripTrailingUrls(text: string): string {
  return text.replace(/https:\/\/t\.co\/\S+$/g, "").trim();
}

export default async function TweetBoard() {
  const raw = await fetchAllTweets();
  const tweets: TweetCard[] = raw
    .filter((t): t is TweetData => t !== undefined)
    .map((t) => ({
      id: t.id_str,
      text: stripTrailingUrls(t.text),
      name: t.user.name,
      handle: t.user.screen_name,
      avatar: t.user.profile_image_url_https,
      images: t.mediaDetails
        ?.filter((m) => m.type === "photo")
        .map((m) => m.media_url_https),
    }));

  return (
    <section id="buzz" className="py-16 sm:py-24 bg-[#F4F3EF] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            Social Buzz
          </span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <h2
            className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            What people are saying
          </h2>
          <a
            href="https://x.com/UBC_Conference"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-[#293C4B] text-sm font-semibold border border-[#293C4B]/20 px-5 py-2.5 rounded-full hover:bg-[#293C4B] hover:text-white transition-colors"
          >
            Follow us →
          </a>
        </div>
        <p className="text-[#9CADB7] text-sm mt-2">Highlights from UBC 2025</p>
      </div>

      {tweets.length > 0 ? (
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <ScrollingTweets tweets={tweets} />
        </div>
      ) : (
        <p className="text-center text-[#9CADB7] text-sm">Highlights coming soon.</p>
      )}
    </section>
  );
}
