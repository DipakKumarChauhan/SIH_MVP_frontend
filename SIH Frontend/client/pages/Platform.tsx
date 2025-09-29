import { useState } from "react";

type Slot = { id: string; train: string; time: string; status: "arriving" | "departed" | "delayed" };

const lanes: { platform: string; slots: Slot[] }[] = [
  //Platform data from backend to be integrated here...
  { platform: "Sealdah", slots: [
    { id: "t1", train: "12345", time: "12:42", status: "arriving" },
    { id: "t2", train: "23456", time: "12:50", status: "arriving" },
  ] },
  { platform: "DumDum", slots: [
    { id: "t3", train: "25698", time: "12:51", status: "arriving" },
    { id: "t4", train: "12365", time: "12:57", status: "departed" },
  ] },
  { platform: "Naihati", slots: [
    { id: "t5", train: "25256", time: "13:02", status: "arriving" as any },
  ] },
  { platform: "Kolkata", slots: [
    { id: "t6", train: "56234", time: "13:06", status: "cancelled" as any },
  ] },
];

export default function Platform() {
  const [selected, setSelected] = useState<Slot | null>(null);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">Platform timeline</h2>
        <p className="text-sm text-muted-foreground mt-1">Realtime occupancy and upcoming arrivals per platform.</p>
      </div>

      <div className="grid gap-4">
        {lanes.map((lane) => (
          <div key={lane.platform} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">{lane.platform}</div>
              <div className="text-sm text-muted-foreground">Next: {lane.slots[0]?.train ?? "—"} • {lane.slots[0]?.time ?? "—"}</div>
            </div>
            <div className="flex gap-3">
              {lane.slots.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={
                    "flex flex-col items-start gap-1 rounded-md px-4 py-3 shadow-sm text-left transition-colors"
                    + (s.status === "arriving"
                      ? " bg-gradient-to-r from-accent/30 to-accent/10"
                      : s.status === "departed"
                      ? " bg-muted/40"
                      : " bg-destructive/20")
                  }
                >
                  <div className="text-sm font-semibold">{s.train}</div>
                  <div className="text-xs text-muted-foreground">{s.time} • {s.status}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="font-semibold">Details</h3>
        {selected ? (
          <div className="mt-3">
            <div className="text-sm">Train: <span className="font-medium">{selected.train}</span></div>
            <div className="text-sm">Scheduled: <span className="font-medium">{selected.time}</span></div>
            <div className="text-sm">Status: <span className="font-medium">{selected.status}</span></div>
            <div className="mt-3 flex gap-2">
              <button className="h-9 px-3 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">Hold</button>
              <button className="h-9 px-3 rounded-md border">Reroute</button>
              <button className="h-9 px-3 rounded-md border">Notes</button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mt-3">Select a train to view details.</div>
        )}
      </div>
    </div>
  );
}
