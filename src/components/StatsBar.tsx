import { Company, STATUTS, STATUT_KEYS } from "@/lib/types";
import { StatusDot } from "./StatusBadge";

export function StatsBar({ companies }: { companies: Company[] }) {
  const total = companies.length;

  return (
    <section className="flex flex-shrink-0 gap-2.5 overflow-x-auto border-b border-border bg-surface p-3 px-4">
      <div className="flex min-w-[128px] flex-1 flex-col gap-0.5 rounded-lg border border-border border-l-4 border-l-accent p-2 px-3">
        <div className="text-[19px] font-extrabold">{total}</div>
        <div className="text-[11px] text-muted">Entreprises au total</div>
      </div>
      {STATUT_KEYS.map((key) => {
        const conf = STATUTS[key];
        const count = companies.filter((c) => c.statut === key).length;
        return (
          <div
            key={key}
            className="flex min-w-[128px] flex-1 flex-col gap-0.5 rounded-lg border border-border p-2 px-3"
            style={{ borderLeft: `4px solid ${conf.dot}` }}
          >
            <div className="text-[19px] font-extrabold">{count}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <StatusDot color={conf.dot} size={8} />
              {conf.label}
            </div>
          </div>
        );
      })}
    </section>
  );
}
