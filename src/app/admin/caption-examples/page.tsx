import {
  createCaptionExampleAction,
  deleteCaptionExampleAction,
  updateCaptionExampleAction,
} from "@/app/actions";
import { Btn, Card, TextArea, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function CaptionExamplesPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("caption_examples")
    .select("id, image_description, caption, explanation, priority, image_id")
    .order("id", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Create Caption Example</h2>
        <form action={createCaptionExampleAction} className="mt-4 space-y-3">
          <TextArea name="image_description" placeholder="Image description" required />
          <TextArea name="caption" placeholder="Caption" required />
          <TextArea name="explanation" placeholder="Explanation" required />
          <div className="grid gap-3 md:grid-cols-2">
            <TextInput name="priority" placeholder="Priority" />
            <TextInput name="image_id" placeholder="Image ID (optional)" />
          </div>
          <Btn>Create</Btn>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Existing Caption Examples</h2>
        <div className="mt-4 space-y-4">
          {(data || []).map((row: any) => {
            const updateAction = updateCaptionExampleAction.bind(null, row.id);

            return (
              <div key={row.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <form action={updateAction} className="space-y-3">
                  <TextArea name="image_description" defaultValue={row.image_description} />
                  <TextArea name="caption" defaultValue={row.caption} />
                  <TextArea name="explanation" defaultValue={row.explanation} />
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextInput name="priority" defaultValue={row.priority} />
                    <TextInput name="image_id" defaultValue={row.image_id ?? ""} />
                  </div>
                  <Btn>Save</Btn>
                </form>

                <form action={deleteCaptionExampleAction} className="mt-3">
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
