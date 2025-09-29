import { useState } from "react";

export default function Settings() {
  const [tab, setTab] = useState<"org" | "users" | "integrations">("org");

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Organization and integration settings.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab("org")} className={tab === "org" ? "px-3 py-1 rounded-md bg-sidebar-primary text-sidebar-primary-foreground" : "px-3 py-1 rounded-md border"}>Organization</button>
          <button onClick={() => setTab("users")} className={tab === "users" ? "px-3 py-1 rounded-md bg-sidebar-primary text-sidebar-primary-foreground" : "px-3 py-1 rounded-md border"}>Users</button>
          <button onClick={() => setTab("integrations")} className={tab === "integrations" ? "px-3 py-1 rounded-md bg-sidebar-primary text-sidebar-primary-foreground" : "px-3 py-1 rounded-md border"}>Integrations</button>
        </div>

        {tab === "org" && (
          <div>
            <label className="text-sm text-muted-foreground">Organization name</label>
            <input className="mt-2 w-full rounded-md border px-3 py-2" defaultValue="RailOps Inc." />

            <label className="text-sm text-muted-foreground mt-4 block">Timezone</label>
            <select className="mt-2 w-full rounded-md border px-3 py-2">
              <option>West Bengal</option>
              <option>Delhi</option>
            </select>

            <div className="mt-4 flex gap-2">
              <button className="h-10 px-4 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">Save</button>
              <button className="h-10 px-4 rounded-md border">Reset</button>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div>
            <h3 className="font-semibold mb-3">Team members</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">Raj Aryan</div>
                  <div className="text-sm text-muted-foreground">Admin</div>
                </div>
                <div className="flex gap-2">
                  <button className="h-8 px-3 rounded-md border">Edit</button>
                  <button className="h-8 px-3 rounded-md bg-destructive/10 text-destructive-foreground">Remove</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "integrations" && (
          <div>
            <h3 className="font-semibold mb-3">Available integrations</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">Neon</div>
                  <div className="text-sm text-muted-foreground">Postgres database integration</div>
                </div>
                <div>
                  <a href="#" className="text-sm text-sidebar-primary">Connect</a>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">Netlify</div>
                  <div className="text-sm text-muted-foreground">Deploy and host</div>
                </div>
                <div>
                  <a href="#" className="text-sm text-sidebar-primary">Connect</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
