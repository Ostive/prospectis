"use client";

import { useMemo } from "react";
import {
  Company,
  Filters,
  defaultFilters,
  STATUTS,
  STATUT_KEYS,
} from "@/lib/types";
import { StatusDot } from "./StatusBadge";

function uniqueSorted(companies: Company[], key: keyof Company): string[] {
  const values = new Set<string>();
  companies.forEach((c) => values.add(String(c[key])));
  return [...values].sort((a, b) => a.localeCompare(b, "fr"));
}

export function FilterSidebar({
  companies,
  filters,
  search,
  onFiltersChange,
  onSearchChange,
  isOpen,
  onClose,
}: {
  companies: Company[];
  filters: Filters;
  search: string;
  onFiltersChange: (f: Filters) => void;
  onSearchChange: (v: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const regions = useMemo(() => uniqueSorted(companies, "region"), [companies]);
  const departements = useMemo(
    () => uniqueSorted(companies, "departement"),
    [companies]
  );
  const villes = useMemo(() => uniqueSorted(companies, "ville"), [companies]);
  const secteurs = useMemo(
    () => uniqueSorted(companies, "secteur"),
    [companies]
  );

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  function toggleStatut(key: keyof typeof STATUTS) {
    const next = new Set(filters.statuts);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setFilter("statuts", next);
  }

  function resetFilters() {
    onFiltersChange(defaultFilters());
    onSearchChange("");
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] flex-shrink-0 overflow-y-auto bg-surface p-4 shadow-xl transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-[268px] lg:translate-x-0 lg:border-r lg:border-border lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4.5 mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Localisation
          </h3>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-region"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Région
            </label>
            <select
              id="filter-region"
              value={filters.region}
              onChange={(e) => setFilter("region", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            >
              <option value="">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-departement"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Département
            </label>
            <select
              id="filter-departement"
              value={filters.departement}
              onChange={(e) => setFilter("departement", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            >
              <option value="">Tous les départements</option>
              {departements.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-ville"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Ville
            </label>
            <select
              id="filter-ville"
              value={filters.ville}
              onChange={(e) => setFilter("ville", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            >
              <option value="">Toutes les villes</option>
              {villes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4.5 mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Activité
          </h3>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-secteur"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Secteur d&apos;activité
            </label>
            <select
              id="filter-secteur"
              value={filters.secteur}
              onChange={(e) => setFilter("secteur", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            >
              <option value="">Tous les secteurs</option>
              {secteurs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-naf"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Code NAF
            </label>
            <input
              type="text"
              id="filter-naf"
              placeholder="ex. 4120A"
              value={filters.naf}
              onChange={(e) => setFilter("naf", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            />
          </div>
        </div>

        <div className="mb-4.5 mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Prospection
          </h3>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted">
            Statut
          </div>
          <div>
            {STATUT_KEYS.map((key) => {
              const conf = STATUTS[key];
              return (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-2 py-1.5 text-[13px]"
                >
                  <input
                    type="checkbox"
                    checked={filters.statuts.has(key)}
                    onChange={() => toggleStatut(key)}
                    className="h-[15px] w-[15px]"
                  />
                  <StatusDot color={conf.dot} />
                  {conf.label}
                </label>
              );
            })}
          </div>
          <div className="mt-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-contact-depuis"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Dernier contact depuis le
            </label>
            <input
              type="date"
              id="filter-contact-depuis"
              value={filters.contactDepuis}
              onChange={(e) => setFilter("contactDepuis", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            />
          </div>
          <div className="mt-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="filter-relance-avant"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Relance prévue avant le
            </label>
            <input
              type="date"
              id="filter-relance-avant"
              value={filters.relanceAvant}
              onChange={(e) => setFilter("relanceAvant", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px]"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={resetFilters}
            className="block w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-[13px] font-semibold transition-colors hover:bg-[#f6f8fa]"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0f1720]/45 lg:hidden"
        />
      )}
    </>
  );
}
