import Link from "next/link";
import { Card } from "@/components/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-2xl p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Protected project</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Admin panel starter</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          Google-protected admin area with dashboard stats, users, images CRUD, and captions read-only pages.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/login" className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white">Login</Link>
          <Link href="/admin/overview" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm">Open admin</Link>
        </div>
      </Card>
    </main>
  );
}