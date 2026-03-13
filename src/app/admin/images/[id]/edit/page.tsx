import Link from "next/link";
import { notFound } from "next/navigation";
import { updateImageAction } from "@/app/actions";
import { Btn, Card, SecondaryBtn, TextArea, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function EditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireSuperadmin();

  const { data: image } = await supabase
    .from("images")
    .select("id, url, image_description, additional_context, is_public")
    .eq("id", id)
    .single();

  if (!image) notFound();

  const action = updateImageAction.bind(null, id);

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Images</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Edit image record</h2>

      <form action={action} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Image URL</label>
          <TextInput name="url" defaultValue={image.url || ""} required />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Image description</label>
          <TextArea name="image_description" defaultValue={image.image_description || ""} />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Additional context</label>
          <TextArea name="additional_context" defaultValue={image.additional_context || ""} />
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" name="is_public" defaultChecked={!!image.is_public} className="h-4 w-4" />
          Make image public
        </label>

        <div className="flex gap-3">
          <Btn>Save changes</Btn>
          <Link href="/admin/images"><SecondaryBtn type="button">Cancel</SecondaryBtn></Link>
        </div>
      </form>
    </Card>
  );
}