"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSuperadmin } from "@/lib/auth";

function toNumberOrNull(value: FormDataEntryValue | null) {
  const s = String(value ?? "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

export async function createImageAction(formData: FormData) {
  const { supabase, user } = await requireSuperadmin();

  const url = String(formData.get("url") || "").trim();
  const image_description = String(formData.get("image_description") || "").trim();
  const additional_context = String(formData.get("additional_context") || "").trim();
  const is_public = formData.get("is_public") === "on";

  await supabase.from("images").insert({
    url,
    image_description,
    additional_context,
    is_public,
    profile_id: user.id,
  });

  revalidatePath("/admin/images");
  redirect("/admin/images");
}

export async function updateImageAction(id: string, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  const url = String(formData.get("url") || "").trim();
  const image_description = String(formData.get("image_description") || "").trim();
  const additional_context = String(formData.get("additional_context") || "").trim();
  const is_public = formData.get("is_public") === "on";

  await supabase
    .from("images")
    .update({ url, image_description, additional_context, is_public })
    .eq("id", id);

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

/* TERMS */
export async function createTermAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase.from("terms").insert({
    term: String(formData.get("term") || "").trim(),
    definition: String(formData.get("definition") || "").trim(),
    example: String(formData.get("example") || "").trim(),
    priority: toNumberOrNull(formData.get("priority")) ?? 0,
    term_type_id: toNumberOrNull(formData.get("term_type_id")),
  });

  revalidatePath("/admin/terms");
}

export async function updateTermAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("terms")
    .update({
      term: String(formData.get("term") || "").trim(),
      definition: String(formData.get("definition") || "").trim(),
      example: String(formData.get("example") || "").trim(),
      priority: toNumberOrNull(formData.get("priority")) ?? 0,
      term_type_id: toNumberOrNull(formData.get("term_type_id")),
    })
    .eq("id", id);

  revalidatePath("/admin/terms");
}

export async function deleteTermAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = Number(formData.get("id"));
  await supabase.from("terms").delete().eq("id", id);
  revalidatePath("/admin/terms");
}

/* HUMOR MIX */
export async function updateHumorMixAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("humor_flavor_mix")
    .update({
      caption_count: toNumberOrNull(formData.get("caption_count")) ?? 0,
    })
    .eq("id", id);

  revalidatePath("/admin/humor-mix");
}

/* CAPTION EXAMPLES */
export async function createCaptionExampleAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase.from("caption_examples").insert({
    image_description: String(formData.get("image_description") || "").trim(),
    caption: String(formData.get("caption") || "").trim(),
    explanation: String(formData.get("explanation") || "").trim(),
    priority: toNumberOrNull(formData.get("priority")) ?? 0,
    image_id: String(formData.get("image_id") || "").trim() || null,
  });

  revalidatePath("/admin/caption-examples");
}

export async function updateCaptionExampleAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("caption_examples")
    .update({
      image_description: String(formData.get("image_description") || "").trim(),
      caption: String(formData.get("caption") || "").trim(),
      explanation: String(formData.get("explanation") || "").trim(),
      priority: toNumberOrNull(formData.get("priority")) ?? 0,
      image_id: String(formData.get("image_id") || "").trim() || null,
    })
    .eq("id", id);

  revalidatePath("/admin/caption-examples");
}

export async function deleteCaptionExampleAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = Number(formData.get("id"));
  await supabase.from("caption_examples").delete().eq("id", id);
  revalidatePath("/admin/caption-examples");
}

/* LLM PROVIDERS */
export async function createLLMProviderAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase.from("llm_providers").insert({
    name: String(formData.get("name") || "").trim(),
  });

  revalidatePath("/admin/llm-providers");
}

export async function updateLLMProviderAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("llm_providers")
    .update({
      name: String(formData.get("name") || "").trim(),
    })
    .eq("id", id);

  revalidatePath("/admin/llm-providers");
}

export async function deleteLLMProviderAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = Number(formData.get("id"));
  await supabase.from("llm_providers").delete().eq("id", id);
  revalidatePath("/admin/llm-providers");
}

/* LLM MODELS */
export async function createLLMModelAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase.from("llm_models").insert({
    name: String(formData.get("name") || "").trim(),
    llm_provider_id: toNumberOrNull(formData.get("llm_provider_id")),
    provider_model_id: String(formData.get("provider_model_id") || "").trim(),
    is_temperature_supported: formData.get("is_temperature_supported") === "on",
  });

  revalidatePath("/admin/llm-models");
}

export async function updateLLMModelAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("llm_models")
    .update({
      name: String(formData.get("name") || "").trim(),
      llm_provider_id: toNumberOrNull(formData.get("llm_provider_id")),
      provider_model_id: String(formData.get("provider_model_id") || "").trim(),
      is_temperature_supported: formData.get("is_temperature_supported") === "on",
    })
    .eq("id", id);

  revalidatePath("/admin/llm-models");
}

export async function deleteLLMModelAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = Number(formData.get("id"));
  await supabase.from("llm_models").delete().eq("id", id);
  revalidatePath("/admin/llm-models");
}

/* ALLOWED SIGNUP DOMAINS */
export async function createAllowedSignupDomainAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase.from("allowed_signup_domains").insert({
    apex_domain: String(formData.get("apex_domain") || "").trim(),
  });

  revalidatePath("/admin/allowed-signup-domains");
}

export async function updateAllowedSignupDomainAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("allowed_signup_domains")
    .update({
      apex_domain: String(formData.get("apex_domain") || "").trim(),
    })
    .eq("id", id);

  revalidatePath("/admin/allowed-signup-domains");
}

export async function deleteAllowedSignupDomainAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = Number(formData.get("id"));
  await supabase.from("allowed_signup_domains").delete().eq("id", id);
  revalidatePath("/admin/allowed-signup-domains");
}

/* WHITELIST EMAILS */
export async function createWhitelistedEmailAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase.from("whitelist_email_addresses").insert({
    email_address: String(formData.get("email_address") || "").trim(),
  });

  revalidatePath("/admin/whitelisted-email-addresses");
}

export async function updateWhitelistedEmailAction(id: number, formData: FormData) {
  const { supabase } = await requireSuperadmin();

  await supabase
    .from("whitelist_email_addresses")
    .update({
      email_address: String(formData.get("email_address") || "").trim(),
    })
    .eq("id", id);

  revalidatePath("/admin/whitelisted-email-addresses");
}

export async function deleteWhitelistedEmailAction(formData: FormData) {
  const { supabase } = await requireSuperadmin();
  const id = Number(formData.get("id"));
  await supabase.from("whitelist_email_addresses").delete().eq("id", id);
  revalidatePath("/admin/whitelisted-email-addresses");
}
