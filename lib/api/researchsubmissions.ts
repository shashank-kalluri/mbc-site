import { supabase, ResearchSubmission } from "@/lib/supabase";

// Get all research submissions
export async function getResearchSubmissions(): Promise<ResearchSubmission[]> {
  try {
    const { data, error } = await supabase
      .from("research_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching research submissions:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching research submissions:", error);
    return [];
  }
}

// Get a single research submission by ID
export async function getResearchSubmissionById(
  id: number
): Promise<ResearchSubmission | null> {
  try {
    const { data, error } = await supabase
      .from("research_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching research submission:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching research submission:", error);
    return null;
  }
}
