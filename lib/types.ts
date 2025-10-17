// lib/types.ts

export interface TweetUser {
  name: string;
  handle: string;
  avatar: string; // URL to profile pic
}

export interface Tweet {
  id: string;
  user: TweetUser;
  text: string;
  mediaUrl?: string; // optional image/video URL
  created_at: string; // ISO timestamp
}

export type Partnership = {
  id: number;
  slug: string;
  name: string;
  website_url: string | null;
  logo_url: string;
  tier: number; // 1=Community, 2=Silver, 3=Gold, 4=Presenting (example)
  status: "active" | "pending" | "inactive";
  created_at: string;
  updated_at: string;
};
