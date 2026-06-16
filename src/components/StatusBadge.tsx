import { STATUTS, StatutKey } from "@/lib/types";

export function StatusBadge({ statut }: { statut: StatutKey }) {
  const conf = STATUTS[statut];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap"
      style={{ background: conf.bg, color: conf.fg }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full flex-shrink-0"
        style={{ background: conf.dot }}
      />
      {conf.label}
    </span>
  );
}

export function StatusDot({
  color,
  size = 9,
}: {
  color: string;
  size?: number;
}) {
  return (
    <span
      className="inline-block rounded-full flex-shrink-0"
      style={{ background: color, width: size, height: size }}
    />
  );
}
