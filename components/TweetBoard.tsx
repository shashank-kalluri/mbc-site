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
    <section id="buzz" className="bg-[#F4F3EF] py-16 sm:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* One dark "screening room" holding the sitcom and the tweet wall */}
        <div className="relative bg-[#1A2A36] rounded-[2rem] overflow-hidden py-12 sm:py-16">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 80% 0%, rgba(236,134,68,0.22) 0%, rgba(236,134,68,0) 70%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(156,173,183,0.14) 0%, rgba(156,173,183,0) 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative px-5 sm:px-10 lg:px-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-[2px] bg-[#EC8644]" />
              <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
                Seen &amp; heard
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 sm:mb-12">
              <h2
                className="font-[var(--font-zuume)] font-black text-white tracking-tight leading-[0.9]"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                UBC, on screen
                <br />
                <span className="text-[#EC8644]">&amp; on the timeline</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-sm">
                Catch up on our original sitcom, then see what people had to say about UBC 2025.
              </p>
            </div>

            {/* Sitcom */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-[#EC8644] animate-ping opacity-60" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-[#EC8644]" />
              </span>
              <span className="text-white text-xs font-semibold tracking-[0.2em] uppercase">
                The UBC Sitcom
              </span>
              <span className="text-white/35 text-xs tracking-[0.2em] uppercase">· Original series</span>
            </div>
            <Sitcom />

            {/* Tweets */}
            <div className="flex items-center justify-between gap-4 mt-14 sm:mt-16 mb-5">
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z" />
                </svg>
                <span className="text-white text-xs font-semibold tracking-[0.2em] uppercase">
                  What people are saying
                </span>
                <span className="hidden sm:inline text-white/35 text-xs tracking-[0.2em] uppercase">
                  · UBC 2025
                </span>
              </div>
              <a
                href="https://x.com/UBC_Conference"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold border border-white/25 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-white hover:text-[#1A2A36] transition-colors"
              >
                Follow us →
              </a>
            </div>
          </div>

          {tweets.length > 0 ? (
            <div className="relative">
              <ScrollingTweets tweets={tweets} fade="from-[#1A2A36]" />
            </div>
          ) : (
            <p className="relative text-center text-white/40 text-sm">Highlights coming soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
