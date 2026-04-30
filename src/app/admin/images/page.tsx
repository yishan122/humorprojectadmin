import Link from "next/link";
import { deleteImageAction } from "@/app/actions";
import { Btn, Card, SecondaryBtn } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function ImagesPage() {
  const { supabase } = await requireSuperadmin();

  const { data: images } = await supabase
    .from("images")
    .select("id, url, image_description, profile_id, is_public, created_datetime_utc")
    .order("created_datetime_utc", { ascending: false })
    .limit(200);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-white">Images</h2>
          <p className="mt-1 text-sm text-slate-400">Create, read, update, and delete image records</p>
        </div>
        <Link href="/admin/images/new">
          <Btn type="button">New image</Btn>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Preview</th>
              <th className="px-6 py-4 text-left font-medium">Description</th>
              <th className="px-6 py-4 text-left font-medium">Owner</th>
              <th className="px-6 py-4 text-left font-medium">Visibility</th>
              <th className="px-6 py-4 text-left font-medium">Created</th>
              <th className="px-6 py-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(images || []).map((image: any) => (
              <tr key={image.id} className="border-t border-white/10 align-top">
                <td className="px-6 py-4">
                  {image.url ? (
                    <img src={image.url} alt="Image preview" className="h-16 w-16 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 text-xs text-slate-500">No image</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="max-w-xl whitespace-pre-wrap text-slate-200">{image.image_description || "No description"}</p>
                  <p className="mt-2 break-all text-xs text-slate-500">{image.url || "—"}</p>
                </td>
                <td className="px-6 py-4 text-slate-300">{image.profile_id || "—"}</td>
                <td className="px-6 py-4 text-slate-300">{image.is_public ? "Public" : "Private"}</td>
                <td className="px-6 py-4 text-slate-400">
                  {image.created_datetime_utc ? new Date(image.created_datetime_utc).toLocaleString() : "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/images/${image.id}/edit`}>
                      <SecondaryBtn type="button">Edit</SecondaryBtn>
                    </Link>
                    <form action={deleteImageAction}>
                      <input type="hidden" name="id" value={image.id} />
                      <SecondaryBtn type="submit" className="border-rose-500/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20">
                        Delete
                      </SecondaryBtn>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
