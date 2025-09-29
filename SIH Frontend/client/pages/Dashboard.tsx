import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import TrainMap, { type Train, type Station } from "@/components/TrainMap";

const kpis = [
  { label: "On-time", value: "92%", sub: "+1.4% WoW" },
  { label: "Active Trains", value: "128", sub: "Peak 142" },
  { label: "Delays >5m", value: "14", sub: "-6 today" },
  { label: "Passengers", value: "64.2k", sub: "+3.1k" },
];

export default function Dashboard() {
  const data = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        hour: `${i}:00`,
        ontime: 80 + Math.round(Math.sin(i / 3) * 8 + Math.random() * 4),
        throughput: 100 + Math.round(Math.cos(i / 2.5) * 30 + Math.random() * 15),
      })),
    [],
  );

  const stations: Station[] = useMemo(
    () => [
      // T shape: Sealdah (left), DumDum (center), Naihati (right), Kolkata (bottom stem)
      { id: "sealdah", name: "Sealdah", x: 160, y: 180, platforms: 14 },
      { id: "dumdum", name: "DumDum", x: 480, y: 180, platforms: 10 },
      { id: "naihati", name: "Naihati", x: 800, y: 180, platforms: 6 },
      { id: "kolkata", name: "Kolkata", x: 480, y: 360, platforms: 12 }
    ],
    [],
  );
// Train status types 
  const trains: Train[] = useMemo(
    () => [
      { id: "IC-1203", label: "IC 1203", from: "sealdah", to: "dumdum", progress: 0.35, status: "on-time" },
      { id: "RE-4821", label: "RE 4821", from: "dumdum", to: "kolkata", progress: 0.5, status: "delayed" },
      // special train parked at Sealdah platform 5 (platformIndex zero-based)
      { id: "ICE-77", label: "ICE 77", from: "sealdah", to: "sealdah", progress: 0, status: "special", platformIndex: 4 },
      { id: "RB-615", label: "RB 615", from: "sealdah", to: "naihati", progress: 0.15, status: "on-time" },
      { id: "REG-900", label: "REG 900", from: "dumdum", to: "kolkata", progress: 0.6, status: "on-time" },
      { id: "EXP-42", label: "EXP 42", from: "kolkata", to: "naihati", progress: 0.3, status: "delayed" },
      { id: "LM-11", label: "LM 11", from: "kolkata", to: "sealdah", progress: 0.8, status: "on-time" },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border bg-card p-5">
            <div className="text-sm text-muted-foreground">{k.label}</div>
            <div className="text-2xl font-semibold mt-2">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.sub}</div>
          </div>
        ))}
      </section>

      {/* <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold mb-3">On-time performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip cursor={{ stroke: "hsl(var(--muted-foreground))", strokeOpacity: 0.2 }} />
                <Line type="monotone" dataKey="ontime" stroke="hsl(var(--sidebar-primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold mb-3">Station throughput</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: "hsl(var(--muted-foreground))", strokeOpacity: 0.2 }} />
                <Area type="monotone" dataKey="throughput" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <TrainMap
              trains={trains}
              stations={stations}
              lines={[["sealdah", "dumdum", "naihati"], ["dumdum", "kolkata"]]}
            />
          </section>
         <section  className="grid gap-6 lg:grid-cols-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-3">On-time performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey="hour" tickLine={false} axisLine={false} minTickGap={24} />
                      <YAxis tickLine={false} axisLine={false} domain={[60, 100]} />
                      <Tooltip cursor={{ stroke: "hsl(var(--muted-foreground))", strokeOpacity: 0.2 }} />
                      <Line type="monotone" dataKey="ontime" stroke="hsl(var(--sidebar-primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-3">Station throughput</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey="hour" tickLine={false} axisLine={false} minTickGap={24} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ stroke: "hsl(var(--muted-foreground))", strokeOpacity: 0.2 }} />
                      <Area type="monotone" dataKey="throughput" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
        </div>
    </div>
  );
}
