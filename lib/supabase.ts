import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Missing Supabase environment variables:
    NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "present" : "missing"}
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "present" : "missing"}
  `);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface University {
  id: number;
  name: string;
  coordinates: [number, number];
  logo_url: string | null;
  website_url: string;
  created_at: string;
  updated_at: string;
}

export interface Partnership {
  id: number;
  name: string;
  logo_url: string | null;
  logo_url_dark: string | null;
  website_url: string;
  tier: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  name: string;
  date_start: string;
  date_end: string;
  location: string;
  attendee_count: number | null;
  telegram_url: string | null;
  website_url: string | null;
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Career {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  stipend: string | null;
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Bounty {
  id: number;
  name: string;
  sponsors: string[];
  deadline: string | null;
  participant_count: number | null;
  prize: string | null;
  tags: string[];
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  submission_link: string | undefined;
}

export interface BountySubmission {
  id: number;
  bounty_id: number;
  user_id: string;
  work_link: string;
  demo_link: string;
  description: string | null;
  contact_info: string | null;
  status: string; // 'pending', 'approved', 'rejected'
  created_at: string;
  updated_at: string;
}

export interface Speaker {
  id: number;
  slug: string;
  name: string;
  title: string;
  featured: boolean;
  company: string;
  image_url: string | null;
  linkedin_url: string | null;
  x_url: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ResearchSubmission {
  id: number;
  submission_link: string;
  name: string;
  university: string;
  asset: string;
  category: string;
  created_at: string;
}

export interface Agenda {
  id: number;
  created_at: string;
  title: string | null;
  location: string | null;
  start: string | null;
  end: string | null; // maps to "end" column
  sponsor: string[] | null; // jsonb
  description: string | null;
  speakers: string[] | null; // jsonb
}
