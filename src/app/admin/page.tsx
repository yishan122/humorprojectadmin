
import { requireSuperadmin } from "@/lib/auth"

export default async function Admin(){

  const {supabase} = await requireSuperadmin()

  const {count:users} = await supabase.from("profiles").select("*",{count:"exact",head:true})
  const {count:images} = await supabase.from("images").select("*",{count:"exact",head:true})
  const {count:captions} = await supabase.from("captions").select("*",{count:"exact",head:true})

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">Users</h3>
        <p className="text-3xl font-bold">{users}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">Images</h3>
        <p className="text-3xl font-bold">{images}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">Captions</h3>
        <p className="text-3xl font-bold">{captions}</p>
      </div>
    </div>
  )
}
