import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const demo = Array.from({ length: 12 }).map((_, i) => ({
  name: `${i + 1}h`, cost: 1000 - i * 30 + Math.round(Math.random() * 40), ontime: 80 + Math.round(Math.random() * 10),
}));

export default function Optimize() {
  const [budget, setBudget] = useState(100000);
  const [constraint, setConstraint] = useState("Minimize delays");

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Optimize schedule</h2>
          <p className="text-sm text-muted-foreground mt-1">Run optimization scenarios and preview impact on KPIs and cost.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-md border">Save scenario</button>
          <button className="h-10 px-4 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">Run</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 lg:col-span-1">
          <h3 className="font-semibold mb-3">Constraints</h3>
          <label className="text-sm text-muted-foreground">Objective</label>
          <select value={constraint} onChange={(e) => setConstraint(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2">
            <option>Minimize delays</option>
            <option>Minimize cost</option>
            <option>Balance load</option>
          </select>

          <label className="text-sm text-muted-foreground mt-4 block">Budget</label>
          <input type="range" min={10000} max={500000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full mt-2" />
          <div className="text-sm text-muted-foreground">{budget.toLocaleString()} €</div>
        </div>

        <div className="rounded-xl border bg-card p-4 lg:col-span-2">
          <h3 className="font-semibold mb-3">Projected impact</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demo} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cost" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.12} />
                <Area type="monotone" dataKey="ontime" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.12} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
