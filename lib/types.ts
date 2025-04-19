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
