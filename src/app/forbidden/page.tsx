import Link from "next/link";
import { Card } from "@/components/ui";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-lg p-8 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Access denied</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Superadmin privileges required</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">You are logged in, but your profile is not allowed to view the admin area.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white">Back to login</Link>
      </Card>
    </main>
  );
}