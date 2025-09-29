import { ReactNode } from "react";

export default function Placeholder({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-4">
          This section is scaffolded. Tell me what to include and I will generate it next.
        </p>
        {children}
      </div>
    </div>
  );
}
