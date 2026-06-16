"use client";

import { Company, SortField, SortState } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatDate, daysFromToday } from "@/lib/utils";

interface Props {
  companies: Company[];
  selectedId: number | null;
  onSelect: (c: Company) => void;
  onViewOnMap: (c: Company) => void;
  sort: SortState;
  onSort: (field: SortField) => void;
}

const COLUMNS: { field: SortField; label: string }[] = [
  { field: "nom", label: "Entreprise" },
  { field: "ville", label: "Ville / Région" },
  { field: "secteur", label: "Secteur" },
  { field: "statut", label: "Statut" },
  { field: "dernierContact", label: "Dernier contact" },
  { field: "prochaineRelance", label: "Prochaine relance" },
];
const ACTION_COL_LABEL = "";

function SortArrow({ field, sort }: { field: SortField; sort: SortState }) {
  if (sort.field !== field) return <span className="ml-1 opacity-25">↕</span>;
  return (
    <span className="ml-1 opacity-70">{sort.dir === "asc" ? "↑" : "↓"}</span>
  );
}

function RelanceCell({ date }: { date: string | null }) {
  if (!date) return <span className="text-muted">—</span>;
  const days = daysFromToday(date);
  const formatted = formatDate(date);

  if (days === null) return <span>{formatted}</span>;

  if (days < 0) {
    return (
      <span className="flex items-center gap-1.5">
        {formatted}
        <span className="rounded-full bg-[#fdecec] px-2 py-0.5 text-[11px] font-bold text-[#b91c1c]">
          En retard
        </span>
      </span>
    );
  }
  if (days <= 3) {
    return (
      <span className="flex items-center gap-1.5">
        {formatted}
        <span className="rounded-full bg-[#e8f1fb] px-2 py-0.5 text-[11px] font-bold text-[#1d4ed8]">
          J-{days}
        </span>
      </span>
    );
  }
  return <span>{formatted}</span>;
}

export function ListView({ companies, selectedId, onSelect, onViewOnMap, sort, onSort }: Props) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.field}
                onClick={() => onSort(col.field)}
                className="sticky top-0 cursor-pointer select-none whitespace-nowrap border-b border-border bg-surface px-3.5 py-2.5 text-left text-[11px] font-extrabold uppercase tracking-wider text-muted hover:text-text"
              >
                {col.label}
                <SortArrow field={col.field} sort={sort} />
              </th>
            ))}
            <th className="sticky top-0 border-b border-border bg-surface px-3.5 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {companies.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-[13px] text-muted"
              >
                Aucune entreprise ne correspond aux filtres sélectionnés.
              </td>
            </tr>
          )}
          {companies.map((c) => (
            <tr
              key={c.id}
              onClick={() => onSelect(c)}
              className={`cursor-pointer border-b border-border transition-colors hover:bg-accent-light ${
                selectedId === c.id ? "bg-[#dcefe9]" : "bg-surface"
              }`}
            >
              <td className="px-3.5 py-2.5">
                <div className="font-bold">{c.nom}</div>
                <div className="text-[12px] text-muted">
                  {c.siren} · {c.naf}
                </div>
              </td>
              <td className="px-3.5 py-2.5">
                <div>{c.ville}</div>
                <div className="text-[12px] text-muted">{c.region}</div>
              </td>
              <td className="whitespace-nowrap px-3.5 py-2.5">{c.secteur}</td>
              <td className="px-3.5 py-2.5">
                <StatusBadge statut={c.statut} />
              </td>
              <td className="whitespace-nowrap px-3.5 py-2.5 text-muted">
                {formatDate(c.dernierContact)}
              </td>
              <td className="whitespace-nowrap px-3.5 py-2.5 text-muted">
                <RelanceCell date={c.prochaineRelance} />
              </td>
              <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onViewOnMap(c)}
                  title="Voir sur la carte"
                  className="flex items-center gap-1.5 rounded-lg border border-accent bg-accent-light px-2.5 py-1.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5 flex-shrink-0">
                    <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
                    <line x1="9" y1="4" x2="9" y2="17" />
                    <line x1="15" y1="7" x2="15" y2="20" />
                  </svg>
                  Carte
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
