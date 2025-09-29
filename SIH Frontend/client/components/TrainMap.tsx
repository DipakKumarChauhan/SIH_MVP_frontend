import { useEffect, useMemo, useRef, useState } from "react";

export type TrainStatus = "on-time" | "delayed" | "special" | "cancelled" | "maintenance";

export type Train = {
  id: string;
  label: string;
  from: string;
  to: string;
  progress: number; // 0..1 between from and to
  status: TrainStatus;
  color?: string; // optional override
  platformIndex?: number; // zero-based index to position on station platform
};

export type Station = { id: string; name: string; x: number; y: number; platforms?: number };

const STATUS_COLOR: Record<TrainStatus, string> = {
  "on-time": "#16a34a", // green
  delayed: "#f59e0b", // amber
  special: "#7c3aed", // purple
  cancelled: "#ef4444", // red
  maintenance: "#f97316", // orange
};

function interpolate(a: Station, b: Station, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export default function TrainMap({
  trains,
  stations,
  lines,
  width = "100%",
  height = 360,
}: {
  trains: Train[];
  stations: Station[];
  lines?: string[][]; // array of station id sequences representing separate lines
  width?: string | number;
  height?: string | number;
}) {
  const [hover, setHover] = useState<{ x: number; y: number; text: string } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const stationById = useMemo(() => {
    const m: Record<string, Station> = {};
    stations.forEach((s) => (m[s.id] = s));
    return m;
  }, [stations]);

  useEffect(() => {
    let raf = 0;
    // animate progress slightly for demo liveliness
    function tick() {
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold">Live map</h3>
          <div className="text-sm text-muted-foreground">Realtime train positions with status color coding</div>
        </div>
        <Legend />
      </div>

      <div className="relative">
        <svg ref={svgRef} viewBox="0 0 1000 480" width={width} height={height} className="w-full h-auto touch-none">
          {/* background similar to the olten diagram */}
          <rect x={0} y={0} width="100%" height="100%" fill="#5ec8beff" stroke="#44bfd4ff" strokeWidth={2} />

          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* connections: draw 4 merged blue/white tracks for each configured line (supports branches) */}
          {(lines ?? [stations.map((s) => s.id)]).map((line, li) => (
            <g key={`line-seq-${li}`}>
              {line.map((sid, i) => {
                const sidNext = line[i + 1];
                if (!sidNext) return null;
                const s = stationById[sid];
                const next = stationById[sidNext];
                if (!s || !next) return null;

                // compute direction and perpendicular for offsetting parallel tracks
                const dx = next.x - s.x;
                const dy = next.y - s.y;
                const len = Math.sqrt(dx * dx + dy * dy) || 1;
                const ux = dx / len;
                const uy = dy / len;
                // perpendicular vector
                const px = -uy;
                const py = ux;

                // offsets for the 4 merged tracks (in px)
                const offsets = [-18, -6, 6, 18];

                return (
                  <g key={`line-${sid}-${sidNext}`}>
                    {offsets.map((off, idx) => (
                      <g key={idx}>
                        {/* blue base line */}
                        <line
                          x1={s.x + px * off}
                          y1={s.y + py * off}
                          x2={next.x + px * off}
                          y2={next.y + py * off}
                          stroke="#1e40af"
                          strokeWidth={8}
                          strokeLinecap="round"
                        />
                        {/* white overlay dash to create mixture effect */}
                        <line
                          x1={s.x + px * off}
                          y1={s.y + py * off}
                          x2={next.x + px * off}
                          y2={next.y + py * off}
                          stroke="#ffffff"
                          strokeWidth={3}
                          strokeDasharray="12 8"
                          strokeLinecap="round"
                          strokeOpacity={0.9}
                        />
                      </g>
                    ))}
                  </g>
                );
              })}
            </g>
          ))}

          {/* stations with platform visualization */}
          {stations.map((s) => (
            <g key={s.id} transform={`translate(${s.x},${s.y})`}>
              {/* station body */}
              <rect x={-28} y={-12} width={56} height={24} rx={4} fill="#1f2937" stroke="#000" strokeWidth={1} />
              <text x={0} y={4} textAnchor="middle" fontSize={12} fill="#fff" style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
                {s.name}
              </text>

              {/* platform bars (light red) arranged vertically */}
              {Array.from({ length: s.platforms ?? 0 }).map((_, idx) => {
                const count = s.platforms ?? 0;
                const barW = 36;
                const barH = 6;
                const gap = 4;
                // center the stack vertically around station center
                const startY = ((idx - (count - 1) / 2) * (barH + gap));
                const startX = 36;
                return (
                  <rect
                    key={idx}
                    x={startX}
                    y={startY - barH / 2}
                    width={barW}
                    height={barH}
                    rx={2}
                    fill="#fecaca"
                    stroke="#f87171"
                    strokeWidth={0.8}
                  />
                );
              })}

              {/* platform count badge */}
              <g transform={`translate(${-(36)},${-26})`}>
                <rect x={-18} y={-10} width={36} height={20} rx={10} fill="#0b3a0b" />
                <text x={0} y={4} textAnchor="middle" fontSize={11} fill="#9be48b">{(s.platforms ?? 0) + ' pl'}</text>
              </g>
            </g>
          ))}

          {/* trains */}
          {trains.map((t) => {
            // if train is assigned to a specific platform index, render over that platform
            if (typeof (t as any).platformIndex === "number") {
              const s = stationById[t.from] || stationById[t.to];
              if (!s) return null;
              const idx = (t as any).platformIndex as number;
              const count = s.platforms ?? 0;
              const barW = 36;
              const barH = 6;
              const gap = 4;
              const startY = ((idx - (count - 1) / 2) * (barH + gap));
              const startX = 36 + barW / 2;
              const pos = { x: s.x + startX, y: s.y + startY };
              const color = t.color ?? STATUS_COLOR[t.status];
              return (
                <g key={t.id} transform={`translate(${pos.x},${pos.y})`}>
                  <circle
                    r={9}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={2}
                    onMouseEnter={() => setHover({ x: pos.x, y: pos.y, text: `${t.label} • ${t.status} • pl ${idx + 1}` })}
                    onMouseLeave={() => setHover(null)}
                  />
                  <text x={12} y={4} fill="#062b06" style={{ fontSize: 12 }}>
                    {t.id}
                  </text>
                </g>
              );
            }

            const from = stationById[t.from];
            const to = stationById[t.to];
            if (!from || !to) return null;
            const pos = interpolate(from, to, Math.max(0, Math.min(1, t.progress)));
            const color = t.color ?? STATUS_COLOR[t.status];
            return (
              <g key={t.id} transform={`translate(${pos.x},${pos.y})`}>
                <circle
                  r={8}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={2}
                  onMouseEnter={(e) => {
                    const rect = svgRef.current?.getBoundingClientRect();
                    setHover({ x: (rect?.left || 0) + pos.x / 1000 * (rect?.width || 0), y: (rect?.top || 0) + pos.y / 480 * (rect?.height || 0), text: `${t.label} • ${t.status}` });
                  }}
                  onMouseLeave={() => setHover(null)}
                />
                <text x={12} y={4} fill="#062b06" style={{ fontSize: 12 }}>
                  {t.id}
                </text>
              </g>
            );
          })}
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute z-50 rounded-md bg-card px-3 py-2 text-sm shadow"
            style={{ left: hover.x + 12, top: hover.y - 8, transform: "translate(-50%, -100%)", minWidth: 120 }}
          >
            {hover.text}
          </div>
        )}
      </div>
    </div>
  );
}

function Legend() {
  const items: { label: string; color: string }[] = [
    { label: "On time", color: STATUS_COLOR["on-time"] },
    { label: "Delayed", color: STATUS_COLOR["delayed"] },
    { label: "Special", color: STATUS_COLOR["special"] },
    { label: "Cancelled", color: STATUS_COLOR["cancelled"] },
    { label: "Maintenance", color: STATUS_COLOR["maintenance"] },
  ];
  return (
    <div className="flex items-center gap-3">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2 text-sm">
          <span className="inline-block h-3 w-6 rounded-sm" style={{ background: it.color }} />
          <span className="text-muted-foreground">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
