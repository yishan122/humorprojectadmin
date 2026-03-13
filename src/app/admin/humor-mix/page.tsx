import { updateHumorMixAction } from "@/app/actions";
import { Btn, Card, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function HumorMixPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("humor_flavor_mix")
    .select("id, humor_flavor_id, caption_count, created_datetime_utc")
    .order("id", { ascending: true });

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Humor Mix</h2>
        <p className="mt-1 text-sm text-slate-400">Read / update caption counts</p>
      </div>

      <div className="space-y-4 p-6">
        {(data || []).map((row: any) => {
          const action = updateHumorMixAction.bind(null, row.id);

          return (
            <form key={row.id} action={action} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_1fr_auto]">
              <div className="text-slate-300">
                <p className="text-sm">ID: {row.id}</p>
                <p className="text-sm">Humor Flavor ID: {row.humor_flavor_id}</p>
              </div>

              <TextInput
                name="caption_count"
                defaultValue={row.caption_count}
                placeholder="Caption count"
              />

              <Btn>Save</Btn>
            </form>
          );
        })}
      </div>
    </Card>
  );
}
