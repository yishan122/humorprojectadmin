import { createLLMProviderAction, deleteLLMProviderAction, updateLLMProviderAction } from "@/app/actions";
import { Btn, Card, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function LLMProvidersPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("llm_providers")
    .select("id, name, created_datetime_utc")
    .order("id", { ascending: false });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Create LLM Provider</h2>
        <form action={createLLMProviderAction} className="mt-4 space-y-3">
          <TextInput name="name" placeholder="Provider name" required />
          <Btn>Create</Btn>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Existing LLM Providers</h2>
        <div className="mt-4 space-y-4">
          {(data || []).map((row: any) => {
            const updateAction = updateLLMProviderAction.bind(null, row.id);

            return (
              <div key={row.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <form action={updateAction} className="space-y-3">
                  <TextInput name="name" defaultValue={row.name} />
                  <Btn>Save</Btn>
                </form>

                <form action={deleteLLMProviderAction} className="mt-3">
                  <input type="hidden" name="id" value={row.id} />
                  <button className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
                    Delete
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
