import { useState } from "react";

const scenarios = [
  { id: "s1", name: "High demand morning", runs: 12, last: "2h ago" },
  { id: "s2", name: "Low staff", runs: 6, last: "1d ago" },
  { id: "s3", name: "Weather delay", runs: 3, last: "3d ago" },
];

export default function Simulations() {
  const [running, setRunning] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Simulations</h2>
          <p className="text-sm text-muted-foreground mt-1">Run scenarios and inspect results to validate schedule changes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-md border">New scenario</button>
          <button className="h-10 px-4 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">Run all</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((s) => (
          <div key={s.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-muted-foreground">{s.last}</div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Runs: {s.runs}</div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setRunning(s.id)} className="h-9 px-3 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">Run</button>
              <button className="h-9 px-3 rounded-md border">View</button>
            </div>
            {running === s.id && <div className="mt-3 text-sm text-muted-foreground">Simulation running… (mock)</div>}
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="font-semibold">Run history</h3>
        <div className="overflow-hidden rounded-md border mt-3">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left p-3">Scenario</th>
                <th className="text-left p-3">Result</th>
                <th className="text-left p-3">When</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">High demand morning</td>
                <td className="p-3">Success</td>
                <td className="p-3">2h ago</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Low staff</td>
                <td className="p-3">Warning</td>
                <td className="p-3">1d ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
