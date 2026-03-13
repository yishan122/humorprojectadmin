"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSuperadmin } from "@/lib/auth";

export async function createImageAction(formData: FormData) {
  const { supabase, user } = await requireSuperadmin();

  const url = String(formData.get("url") || "").trim();
  const image_description = String(formData.get("image_description") || "").trim();
  const additional_context = String(formData.get("additional_context") || "").trim();
  const is_public = formData.get("is_public") === "on";

  await supabase.from("images").insert({ url, image_description, additional_context, is_public, profile_id: user.id });

  revalidatePath("/admin/images");
  redirect("/admin/images");
}

export async function updateImageAction(id: string, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  const url = String(formData.get("url") || "").trim();
  const image_description = String(formData.get("image_description") || "").trim();
  const additional_context = String(formData.get("additional_context") || "").trim();
  const is_public = formData.get("is_public") === "on";

  await supabase.from("images").update({ url, image_description, additional_context, is_public }).eq("id", id);

  revalidatePath("/admin/images");
  redirect("/admin/images");
}

export async function deleteImageAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = String(formData.get("id") || "");
  await supabase.from("images").delete().eq("id", id);
  revalidatePath("/admin/images");
}

export async function signOutAction() {
  const { supabase } = await requireSuperadmin();
  await supabase.auth.signOut();
  redirect("/login");
}