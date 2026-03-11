"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function handleGoogleLogin() {
    const supabase = createClient();

    const redirectTo = "https://admin.almostcrackd.ai/auth/callback";
    console.log("redirectTo =", redirectTo);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    console.log("oauth result =", { data, error });

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="rounded-xl bg-black px-6 py-3 text-white"
      >
        Sign in with Google
      </button>
    </main>
  );
}