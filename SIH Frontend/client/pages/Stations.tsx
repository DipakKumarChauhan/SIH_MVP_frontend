import { useMemo } from "react";

const stations = [
  { id: "sealdah", name: "Sealdah", throughput: 200, ontime: 88, dwell: 4.2, platforms: 14 },
  { id: "dumdum", name: "DumDum", throughput: 500, ontime: 85, dwell: 3.8, platforms: 10 },
  { id: "kolkata", name: "Kolkata", throughput: 60, ontime: 82, dwell: 3.6, platforms: 6 },
  { id: "naihati", name: "Naihati", throughput: 200, ontime: 87, dwell: 4.0, platforms: 12 },
];

export default function Stations() {
  const sorted = useMemo(() => stations.slice().sort((a, b) => b.throughput - a.throughput), []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sorted.map((s) => (
          <div key={s.id} className="rounded-xl border bg-card p-4">
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-muted-foreground mt-1">Throughput</div>
            <div className="text-2xl font-bold">{s.throughput}</div>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div>{s.ontime}% on-time</div>
              <div>Avg dwell {s.dwell}m</div>
              <div>{(s as any).platforms ?? "-"} platforms</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="font-semibold mb-3">Stations table</h3>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left p-3">Station</th>
                <th className="text-left p-3">Throughput</th>
                <th className="text-left p-3">On-time</th>
                <th className="text-left p-3">Avg dwell</th>
                <th className="text-left p-3">Platforms</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.throughput}</td>
                  <td className="p-3">{s.ontime}%</td>
                  <td className="p-3">{s.dwell}m</td>
                  <td className="p-3">{(s as any).platforms ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
