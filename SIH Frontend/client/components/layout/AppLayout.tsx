import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  GaugeCircle,
  Train,
  Landmark,
  Building2,
  Rocket,
  AlertTriangle,
  Activity,
  Settings,
} from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: GaugeCircle },
  { to: "/trains", label: "Trains", icon: Train },
  { to: "/platform", label: "Platform", icon: Landmark },
  { to: "/stations", label: "Stations", icon: Building2 },
  { to: "/optimize", label: "Optimize", icon: Rocket },
  { to: "/conflicts", label: "Conflicts", icon: AlertTriangle },
  { to: "/simulations", label: "Simulations", icon: Activity },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[auto_1fr] bg-background text-foreground">
      <aside className="row-span-2 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2 text-sidebar-primary font-extrabold tracking-tight text-lg">
            <span className="inline-block h-8 w-8 rounded-md bg-sidebar-primary" />
            RailOps
          </div>
        </div>
        <nav className="p-2">
          {nav.map((item) => (
            <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </nav>
      </aside>
      <Topbar />
      <main className="p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function Topbar() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  const location = useLocation();
  const title = nav.find((n) => n.to === location.pathname)?.label ?? "";
  return (
    <header className="h-16 col-start-2 bg-card/60 backdrop-blur border-b border-border flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <input
          placeholder="Search…"
          className="h-9 w-64 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          aria-label="Toggle theme"
          onClick={() => setDark((v) => !v)}
          className="h-9 px-3 rounded-md border bg-background text-sm hover:bg-accent"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-sidebar-accent",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
        )
      }
      end
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
}

export default AppLayout;
