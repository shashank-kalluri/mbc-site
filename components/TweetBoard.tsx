import { getTweet, type Tweet as TweetData } from "react-tweet/api";
import { tweetUrls } from "@/data/tweets";
import ScrollingTweets, { type TweetCard } from "./ScrollingTweets";
import Sitcom from "./Videos";

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
    <section id="buzz" className="bg-[#F4F3EF] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-[2px] bg-[#EC8644]" />
          <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
            Last year
          </span>
        </div>
        <h2
          className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-10 sm:mb-12"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          UBC 2025 <span className="text-[#EC8644]">rewind</span>
        </h2>

        {/* Sitcom */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-[#EC8644] animate-ping opacity-60" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#EC8644]" />
          </span>
          <span className="text-[#293C4B] text-xs font-semibold tracking-[0.2em] uppercase">
            The UBC Sitcom
          </span>
        </div>
        <Sitcom />

        {/* Tweets */}
        <div className="flex items-center justify-between gap-4 mt-14 sm:mt-16 mb-5">
          <div className="flex items-center gap-2.5">
            <svg className="w-3.5 h-3.5 text-[#293C4B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z" />
            </svg>
            <span className="text-[#293C4B] text-xs font-semibold tracking-[0.2em] uppercase">
              What people said
            </span>
          </div>
          <a
            href="https://x.com/UBC_Conference"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-[#293C4B] text-xs sm:text-sm font-semibold border border-[#293C4B]/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#293C4B] hover:text-white transition-colors"
          >
            Follow us →
          </a>
        </div>

        {tweets.length > 0 ? (
          <ScrollingTweets tweets={tweets} />
        ) : (
          <p className="text-center text-[#9CADB7] text-sm">Highlights coming soon.</p>
        )}
      </div>
    </section>
  );
}
