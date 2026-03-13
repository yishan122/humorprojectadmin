import Link from "next/link";
import { createImageAction } from "@/app/actions";
import { Btn, Card, SecondaryBtn, TextArea, TextInput } from "@/components/ui";

export default function NewImagePage() {
  return (
    <Card className="mx-auto max-w-2xl p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Images</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Create image record</h2>

      <form action={createImageAction} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Image URL</label>
          <TextInput name="url" placeholder="https://..." required />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Image description</label>
          <TextArea name="image_description" placeholder="Describe the image..." />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Additional context</label>
          <TextArea name="additional_context" placeholder="Optional context..." />
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" name="is_public" className="h-4 w-4" />
          Make image public
        </label>

        <div className="flex gap-3">
          <Btn>Create</Btn>
          <Link href="/admin/images"><SecondaryBtn type="button">Cancel</SecondaryBtn></Link>
        </div>
      </form>
    </Card>
  );
}