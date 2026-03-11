
import { requireSuperadmin } from "@/lib/auth"

export default async function AdminLayout({children}:{children:React.ReactNode}){

  await requireSuperadmin()

  return (
    <div className="min-h-screen">
      <div className="border-b p-4 font-semibold">
        Admin Dashboard
      </div>

      <div className="p-8">
        {children}
      </div>
    </div>
  )
}
