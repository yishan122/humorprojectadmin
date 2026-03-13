import { Card } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function LLMResponsesPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("llm_model_responses")
    .select("id, profile_id, caption_request_id, llm_model_id, processing_time_seconds, created_datetime_utc")
    .order("created_datetime_utc", { ascending: false })
    .limit(200);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">LLM Responses</h2>
        <p className="mt-1 text-sm text-slate-400">Read-only view</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Profile ID</th>
              <th className="px-6 py-4 text-left">Caption Request ID</th>
              <th className="px-6 py-4 text-left">LLM Model ID</th>
              <th className="px-6 py-4 text-left">Processing Seconds</th>
              <th className="px-6 py-4 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((row: any) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-6 py-4 text-slate-300">{row.id}</td>
                <td className="px-6 py-4 text-slate-300">{row.profile_id}</td>
                <td className="px-6 py-4 text-slate-300">{row.caption_request_id}</td>
                <td className="px-6 py-4 text-slate-300">{row.llm_model_id}</td>
                <td className="px-6 py-4 text-slate-300">{row.processing_time_seconds}</td>
                <td className="px-6 py-4 text-slate-300">
                  {row.created_datetime_utc ? new Date(row.created_datetime_utc).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
