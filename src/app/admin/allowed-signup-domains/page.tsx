import {
  createAllowedSignupDomainAction,
  deleteAllowedSignupDomainAction,
  updateAllowedSignupDomainAction,
} from "@/app/actions";
import { Btn, Card, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function AllowedSignupDomainsPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("allowed_signup_domains")
    .select("id, apex_domain, created_datetime_utc")
    .order("id", { ascending: false });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Create Signup Domain</h2>
        <form action={createAllowedSignupDomainAction} className="mt-4 space-y-3">
          <TextInput name="apex_domain" placeholder="example.edu" required />
          <Btn>Create</Btn>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Existing Signup Domains</h2>
        <div className="mt-4 space-y-4">
          {(data || []).map((row: any) => {
            const updateAction = updateAllowedSignupDomainAction.bind(null, row.id);

            return (
              <div
                key={row.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="space-y-3">
                  <form action={updateAction} className="space-y-3">
                    <TextInput name="apex_domain" defaultValue={row.apex_domain} />
                    <Btn>Save</Btn>
                  </form>

                  <form action={deleteAllowedSignupDomainAction}>
                    <input type="hidden" name="id" value={row.id} />
                    <button className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
