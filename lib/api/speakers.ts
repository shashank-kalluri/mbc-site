import { supabase, Speaker } from "@/lib/supabase";

// Get all speakers
export async function getSpeakers(): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching speakers:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching speakers:", error);
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
