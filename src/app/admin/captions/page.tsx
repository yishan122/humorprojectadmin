import { Card } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";
import { Badge } from "lucide-react";

export default async function CaptionsPage() {
  const { supabase } = await requireSuperadmin();

  const { data: captions } = await supabase
    .from("captions")
    .select("id, image_id, profile_id, content, like_count, is_public, is_featured, created_datetime_utc")
    .order("created_datetime_utc", { ascending: false })
    .limit(200);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Captions</h2>
        <p className="mt-1 text-sm text-slate-400">Read-only caption records</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Caption</th>
              <th className="px-6 py-4 text-left font-medium">Image ID</th>
              <th className="px-6 py-4 text-left font-medium">Profile ID</th>
              <th className="px-6 py-4 text-left font-medium">Flags</th>
              <th className="px-6 py-4 text-left font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {(captions || []).map((caption: any) => (
              <tr key={caption.id} className="border-t border-white/10 align-top">
                <td className="px-6 py-4">
                  <p className="max-w-xl whitespace-pre-wrap text-slate-200">{caption.content || "—"}</p>
                  <p className="mt-2 text-xs text-slate-500">Likes: {caption.like_count || 0}</p>
                </td>
                <td className="px-6 py-4 text-slate-300">{caption.image_id}</td>
                <td className="px-6 py-4 text-slate-300">{caption.profile_id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {caption.is_public ? <Badge>Public</Badge> : <Badge>Private</Badge>}
                    {caption.is_featured ? <Badge>Featured</Badge> : null}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400">{caption.created_datetime_utc ? new Date(caption.created_datetime_utc).toLocaleString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}