import { Card, StatCard, Badge } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function OverviewPage() {
  const { supabase } = await requireSuperadmin();

  const [
    { count: usersCount },
    { count: imagesCount },
    { count: captionsCount },
    { count: publicImagesCount },
    { count: featuredCaptionsCount }
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("images").select("*", { count: "exact", head: true }),
    supabase.from("captions").select("*", { count: "exact", head: true }),
    supabase.from("images").select("*", { count: "exact", head: true }).eq("is_public", true),
    supabase.from("captions").select("*", { count: "exact", head: true }).eq("is_featured", true)
  ]);

  const { data: recentImages } = await supabase.from("images").select("id, profile_id, created_datetime_utc").order("created_datetime_utc", { ascending: false }).limit(200);
  const { data: recentCaptions } = await supabase.from("captions").select("id, content, like_count, created_datetime_utc").order("created_datetime_utc", { ascending: false }).limit(10);

  const byUser = (recentImages || []).reduce((acc: Record<string, number>, item: { profile_id: string | null }) => {
    const key = item.profile_id || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topUploaders = Object.entries(byUser).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Overview</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Key stats and activity at a glance</h2>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Users" value={usersCount || 0} subtitle="Profiles in database" />
        <StatCard title="Images" value={imagesCount || 0} subtitle={`${publicImagesCount || 0} public`} />
        <StatCard title="Captions" value={captionsCount || 0} subtitle={`${featuredCaptionsCount || 0} featured`} />
        <StatCard title="Avg captions / image" value={imagesCount ? ((captionsCount || 0) / Math.max(imagesCount || 1, 1)).toFixed(2) : "0.00"} subtitle="Content density" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Top uploaders</h3>
              <p className="mt-1 text-sm text-slate-400">Recent image activity by profile</p>
            </div>
            <Badge>Live summary</Badge>
          </div>

          <div className="mt-6 space-y-4">
            {topUploaders.length === 0 ? (
              <p className="text-sm text-slate-500">No image activity found.</p>
            ) : (
              topUploaders.map(([profileId, count], index) => (
                <div key={profileId} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-200">#{index + 1} · {profileId.slice(0, 8)}...</span>
                    <span className="text-slate-400">{count} uploads</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.max(10, (count / (topUploaders[0][1] || 1)) * 100)}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white">Recent captions</h3>
          <p className="mt-1 text-sm text-slate-400">Latest caption records</p>

          <div className="mt-6 space-y-3">
            {(recentCaptions || []).map((item: { id: string; content: string | null; like_count: number | null; created_datetime_utc: string | null }) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="line-clamp-2 text-sm text-slate-200">{item.content || "—"}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Likes: {item.like_count || 0}</span>
                  <span>{item.created_datetime_utc ? new Date(item.created_datetime_utc).toLocaleString() : "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}