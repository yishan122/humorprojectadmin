import { Card } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function HumorFlavorStepsPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("humor_flavor_steps")
    .select("id, humor_flavor_id, order_by, llm_model_id, description, llm_temperature")
    .order("id", { ascending: true });

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Humor Flavor Steps</h2>
        <p className="mt-1 text-sm text-slate-400">Read-only view</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Flavor ID</th>
              <th className="px-6 py-4 text-left">Order</th>
              <th className="px-6 py-4 text-left">LLM Model</th>
              <th className="px-6 py-4 text-left">Temp</th>
              <th className="px-6 py-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((row: any) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-6 py-4 text-slate-300">{row.id}</td>
                <td className="px-6 py-4 text-slate-300">{row.humor_flavor_id}</td>
                <td className="px-6 py-4 text-slate-300">{row.order_by}</td>
                <td className="px-6 py-4 text-slate-300">{row.llm_model_id}</td>
                <td className="px-6 py-4 text-slate-300">{row.llm_temperature ?? "—"}</td>
                <td className="px-6 py-4 text-slate-300">{row.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
