"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function handleGoogleLogin() {
    const supabase = createClient();

    const redirectTo = `${window.location.origin}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/40 p-8 shadow-xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Secure access
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Sign in to admin
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Continue with Google to access the protected admin area.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-8 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Log in with Google
        </button>
      </div>
    </main>
  );
}