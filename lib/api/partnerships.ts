import { supabase, Partnership } from "@/lib/supabase";

// Get all partnerships
export async function getPartnerships(): Promise<Partnership[]> {
  try {
    const { data, error } = await supabase
      .from("partnerships")
      .select("*")
      .order("tier", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching partnerships:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching partnerships:", error);
    return [];
  }
}

// Get partnership by ID
export async function getPartnershipById(
  id: number
): Promise<Partnership | null> {
  try {
    const { data, error } = await supabase
      .from("partnerships")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching partnership:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching partnership:", error);
    return null;
  }
}
