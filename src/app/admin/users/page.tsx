import { Badge, Card } from "@/components/ui";
import { profileName, requireSuperadmin } from "@/lib/auth";

export default async function UsersPage() {
  const { supabase } = await requireSuperadmin();

  const { data: users } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email, is_superadmin, is_in_study, is_matrix_admin, created_datetime_utc")
    .order("created_datetime_utc", { ascending: false })
    .limit(200);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Users / Profiles</h2>
        <p className="mt-1 text-sm text-slate-400">Read-only profile view</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left font-medium">User</th>
              <th className="px-6 py-4 text-left font-medium">Email</th>
              <th className="px-6 py-4 text-left font-medium">Flags</th>
              <th className="px-6 py-4 text-left font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map((user: any) => (
              <tr key={user.id} className="border-t border-white/10">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-100">{profileName(user)}</p>
                  <p className="text-xs text-slate-500">{user.id}</p>
                </td>
                <td className="px-6 py-4 text-slate-300">{user.email || "—"}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {user.is_superadmin ? <Badge>Superadmin</Badge> : <Badge>Standard</Badge>}
                    {user.is_in_study ? <Badge>In study</Badge> : null}
                    {user.is_matrix_admin ? <Badge>Matrix admin</Badge> : null}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400">{user.created_datetime_utc ? new Date(user.created_datetime_utc).toLocaleString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}