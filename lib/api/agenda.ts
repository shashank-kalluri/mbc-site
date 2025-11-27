// lib/api/agenda.ts
import { supabase } from "@/lib/supabase";

export type Agenda = {
  id: number;
  created_at: string;
  title: string | null;
  location: string | null;
  start: string | null;
  end: string | null; // maps to "end" column
  sponsor: string[] | null; // jsonb
  description: string | null;
  speakers: string[] | null; // jsonb
};

// Get all agenda items (ordered by start time, then title)
export async function getAgenda(): Promise<Agenda[]> {
  try {
    const { data, error } = await supabase
      .from("agenda")
      .select("*")
      .order("start", { ascending: true })
      .order("title", { ascending: true });

    if (error) {
      console.error("Error fetching agenda:", error);
      return [];
    }

    return (data as Agenda[]) || [];
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return [];
  }
}

// Get a single agenda item by ID
export async function getAgendaById(id: number): Promise<Agenda | null> {
  try {
    const { data, error } = await supabase
      .from("agenda")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching agenda item:", error);
      return null;
    }

    return data as Agenda;
  } catch (error) {
    console.error("Error fetching agenda item:", error);
    return null;
  }
}
