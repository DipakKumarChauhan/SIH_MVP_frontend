import { useState } from "react";

const conflicts = [
  { id: "c1", trains: ["12345", "23456"], severity: "High", time: "12:50", description: "Platform overlap at Sealdah" },
  { id: "c2", trains: ["32165", "456123"], severity: "Medium", time: "12:57", description: "Track occupation conflict near DumDum" },
  { id: "c3", trains: ["14253"], severity: "Low", time: "13:06", description: "Crew shortage at Naihati" },
];

export default function Conflicts() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-xl border bg-card p-4">
          <h2 className="font-semibold">Conflicts</h2>
          <p className="text-sm text-muted-foreground mt-1">Review detected conflicts and triage them.</p>
        </div>

        <div className="rounded-xl border bg-card p-2 overflow-auto">
          <ul>
            {conflicts.map((c) => (
              <li key={c.id} className="border-b last:border-b-0">
                <button onClick={() => setActive(c.id)} className="w-full text-left p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.trains.join(" / ")}</div>
                    <div className="text-sm text-muted-foreground">{c.description}</div>
                  </div>
                  <div className={
                    "text-sm font-semibold px-3 py-1 rounded-full"
                    + (c.severity === "High" ? " bg-destructive/20 text-destructive-foreground" : c.severity === "Medium" ? " bg-yellow-100 text-yellow-800" : " bg-muted/40 text-muted-foreground")
                  }>{c.severity}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Triage</h3>
          <p className="text-sm text-muted-foreground mt-1">Select a conflict to see details and recommended actions.</p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          {active ? (
            (() => {
              const c = conflicts.find((x) => x.id === active)!;
              return (
                <div>
                  <div className="font-semibold">{c.trains.join(" / ")}</div>
                  <div className="text-sm text-muted-foreground mt-1">{c.description}</div>
                  <div className="mt-3 text-sm">Time: <span className="font-medium">{c.time}</span></div>
                  <div className="mt-4 flex gap-2">
                    <button className="h-9 px-3 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">Apply fix</button>
                    <button className="h-9 px-3 rounded-md border">Defer</button>
                    <button className="h-9 px-3 rounded-md border">Assign</button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-sm text-muted-foreground">No conflict selected. Choose one from the list to triage.</div>
          )}
        </div>
      </aside>
    </div>
  );
}
