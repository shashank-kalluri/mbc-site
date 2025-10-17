import { supabase, University } from "@/lib/supabase";

// Get all universities
export async function getUniversities(): Promise<University[]> {
  try {
    const { data, error } = await supabase
      .from("universities")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching universities:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
}

// Get university by ID
export async function getUniversityById(
  id: number
): Promise<University | null> {
  try {
    const { data, error } = await supabase
      .from("universities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching university:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching university:", error);
    return null;
  }
}
