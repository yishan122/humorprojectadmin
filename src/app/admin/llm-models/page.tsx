import { createLLMModelAction, deleteLLMModelAction, updateLLMModelAction } from "@/app/actions";
import { Btn, Card, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function LLMModelsPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("llm_models")
    .select("id, name, llm_provider_id, provider_model_id, is_temperature_supported")
    .order("id", { ascending: false });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Create LLM Model</h2>
        <form action={createLLMModelAction} className="mt-4 space-y-3">
          <TextInput name="name" placeholder="Name" required />
          <TextInput name="llm_provider_id" placeholder="LLM Provider ID" required />
          <TextInput name="provider_model_id" placeholder="Provider Model ID" required />
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" name="is_temperature_supported" className="h-4 w-4" />
            Temperature supported
          </label>
          <Btn>Create</Btn>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Existing LLM Models</h2>
        <div className="mt-4 space-y-4">
          {(data || []).map((row: any) => {
            const updateAction = updateLLMModelAction.bind(null, row.id);

            return (
              <div key={row.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <form action={updateAction} className="space-y-3">
                  <TextInput name="name" defaultValue={row.name} />
                  <TextInput name="llm_provider_id" defaultValue={row.llm_provider_id} />
                  <TextInput name="provider_model_id" defaultValue={row.provider_model_id} />
                  <label className="flex items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      name="is_temperature_supported"
                      defaultChecked={!!row.is_temperature_supported}
                      className="h-4 w-4"
                    />
                    Temperature supported
                  </label>
                  <Btn>Save</Btn>
                </form>

                <form action={deleteLLMModelAction} className="mt-3">
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
