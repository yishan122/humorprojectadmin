import { Card } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function HumorFlavorsPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("humor_flavors")
    .select("id, slug, description, created_datetime_utc")
    .order("id", { ascending: true });

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Humor Flavors</h2>
        <p className="mt-1 text-sm text-slate-400">Read-only view</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((row: any) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-6 py-4 text-slate-300">{row.id}</td>
                <td className="px-6 py-4 text-slate-300">{row.slug}</td>
                <td className="px-6 py-4 text-slate-300">{row.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
