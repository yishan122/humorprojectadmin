import Link from "next/link";
import { ReactNode } from "react";
import { signOutAction } from "@/app/actions";
import { profileName, requireSuperadmin } from "@/lib/auth";

const nav = [
  { href: "/admin/overview", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/captions", label: "Captions" }
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { profile } = await requireSuperadmin();

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 bg-slate-950/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Admin Area</p>
            <h1 className="text-xl font-semibold text-white">Content control panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="text-sm text-slate-200">{profileName(profile)}</p>
            </div>
            <form action={signOutAction}>
              <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">Sign out</button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-8 flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}