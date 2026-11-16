import { supabase, Speaker } from "@/lib/supabase";

// The speakers section and the agenda both read the list, so a page load fetches it once.
let allSpeakers: Promise<Speaker[]> | null = null;

// Get all speakers
export function getSpeakers(): Promise<Speaker[]> {
  allSpeakers ??= fetchSpeakers();
  return allSpeakers;
}

async function fetchSpeakers(): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching speakers:", error);
      allSpeakers = null;
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching speakers:", error);
    allSpeakers = null;
    return [];
  }
}

// Get speaker by ID
export async function getSpeakerById(id: number): Promise<Speaker | null> {
  try {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching speaker:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching speaker:", error);
    return null;
  }
}
