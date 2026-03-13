import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return { supabase, user };
}

export async function requireSuperadmin() {
  const { supabase, user } = await requireUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email, is_superadmin")
    .eq("id", user.id)
    .single();

  if (error || !profile?.is_superadmin) {
    redirect("/forbidden");
  }

  return { supabase, user, profile };
}

export function profileName(profile: {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  id?: string | null;
}) {
  const full = [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim();
  return full || profile.email || profile.id || "Unknown user";
}