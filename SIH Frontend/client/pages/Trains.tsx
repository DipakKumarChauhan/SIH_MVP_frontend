import { useMemo, useState } from "react";

interface TrainRow {
  id: string;
  line: string;
  origin: string;
  destination: string;
  eta: string;
  status: "On time" | "Delayed" | "Cancelled";
}
//Train info from backend to be integrated here...
const demo: TrainRow[] = [
  { id: "12345", line: "InterCity", origin: "Sealdah", destination: "Ballia", eta: "12:42", status: "On time" },
  { id: "12345", line: "Regional", origin: "DumDum", destination: "Kolkata", eta: "12:49", status: "Delayed" },
  { id: "12345", line: "ICE", origin: "Sealdah", destination: "Sealdah", eta: "12:51", status: "On time" },
  { id: "12345", line: "Regional", origin: "Sealdah", destination: "Naihati", eta: "12:57", status: "Cancelled" },
  { id: "12345", line: "Regional", origin: "DumDum", destination: "Kolkata", eta: "13:06", status: "On time" },
  { id: "12345", line: "Express", origin: "Kolkata", destination: "Naihati", eta: "13:20", status: "Delayed" },
  { id: "12345", line: "Local", origin: "Kolkata", destination: "Sealdah", eta: "13:30", status: "On time" }
];

const statuses: TrainRow["status"][] = ["On time", "Delayed", "Cancelled"];

export default function Trains() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TrainRow["status"] | "All">("All");

  const filtered = useMemo(() => {
    return demo.filter((r) => {
      const q = query.toLowerCase();
      const matchesQ = [r.id, r.line, r.origin, r.destination].some((v) => v.toLowerCase().includes(q));
      const matchesS = status === "All" ? true : r.status === status;
      return matchesQ && matchesS;
    });
  }, [query, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search train, line, origin…"
          className="h-10 w-64 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option>All</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button className="h-10 px-4 rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-sm">Export</button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left p-3 font-medium">Train</th>
              <th className="text-left p-3 font-medium">Line</th>
              <th className="text-left p-3 font-medium">Origin</th>
              <th className="text-left p-3 font-medium">Destination</th>
              <th className="text-left p-3 font-medium">ETA</th>
              <th className="text-left p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3 font-medium">{r.id}</td>
                <td className="p-3">{r.line}</td>
                <td className="p-3">{r.origin}</td>
                <td className="p-3">{r.destination}</td>
                <td className="p-3">{r.eta}</td>
                <td className="p-3">
                  <span
                    className={
                      r.status === "On time"
                        ? "inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs"
                        : r.status === "Delayed"
                        ? "inline-flex items-center gap-2 rounded-full bg-yellow-100 text-yellow-800 px-2 py-1 text-xs"
                        : "inline-flex items-center gap-2 rounded-full bg-red-100 text-red-800 px-2 py-1 text-xs"
                    }
                  >
                    <span className="h-2 w-2 rounded-full bg-current" /> {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
