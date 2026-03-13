import {
  createWhitelistedEmailAction,
  deleteWhitelistedEmailAction,
  updateWhitelistedEmailAction,
} from "@/app/actions";
import { Btn, Card, TextInput } from "@/components/ui";
import { requireSuperadmin } from "@/lib/auth";

export default async function WhitelistedEmailsPage() {
  const { supabase } = await requireSuperadmin();

  const { data } = await supabase
    .from("whitelist_email_addresses")
    .select("id, email_address, created_datetime_utc")
    .order("id", { ascending: false });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Create Whitelisted Email</h2>
        <form action={createWhitelistedEmailAction} className="mt-4 space-y-3">
          <TextInput name="email_address" placeholder="user@example.com" required />
          <Btn>Create</Btn>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white">Existing Whitelisted Emails</h2>
        <div className="mt-4 space-y-4">
          {(data || []).map((row: any) => {
            const updateAction = updateWhitelistedEmailAction.bind(null, row.id);

            return (
              <div key={row.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <form action={updateAction} className="space-y-3">
                  <TextInput name="email_address" defaultValue={row.email_address} />
                  <Btn>Save</Btn>
                </form>

                <form action={deleteWhitelistedEmailAction} className="mt-3">
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
