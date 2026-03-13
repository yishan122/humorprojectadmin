import { createTermAction, deleteTermAction, updateTermAction } from "@/app/actions";
import { Btn, Card, TextArea, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function TermsPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("terms")
    .select("id, term, definition, example, priority, term_type_id")
    .order("id", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Create Term</h2>
        <form action={createTermAction} className="mt-4 space-y-3">
          <TextInput name="term" placeholder="Term" required />
          <TextArea name="definition" placeholder="Definition" required />
          <TextArea name="example" placeholder="Example" required />
          <div className="grid gap-3 md:grid-cols-2">
            <TextInput name="priority" placeholder="Priority" />
            <TextInput name="term_type_id" placeholder="Term Type ID" />
          </div>
          <Btn>Create</Btn>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Existing Terms</h2>
        <div className="mt-4 space-y-4">
          {(data || []).map((row: any) => {
            const updateAction = updateTermAction.bind(null, row.id);

            return (
              <div key={row.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <form action={updateAction} className="space-y-3">
                  <TextInput name="term" defaultValue={row.term} />
                  <TextArea name="definition" defaultValue={row.definition} />
                  <TextArea name="example" defaultValue={row.example} />
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextInput name="priority" defaultValue={row.priority} />
                    <TextInput name="term_type_id" defaultValue={row.term_type_id ?? ""} />
                  </div>
                  <Btn>Save</Btn>
                </form>

                <form action={deleteTermAction} className="mt-3">
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
