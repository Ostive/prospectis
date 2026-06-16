import { useMemo } from "react";
import { Company, Filters, SortState, STATUTS } from "@/lib/types";

export function useFilteredCompanies(
  companies: Company[],
  search: string,
  filters: Filters,
  sort: SortState
): Company[] {
  return useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = companies.filter((c) => {
      if (q) {
        const haystack =
          `${c.nom} ${c.siren} ${c.siret} ${c.ville} ${c.naf}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.region && c.region !== filters.region) return false;
      if (filters.departement && c.departement !== filters.departement)
        return false;
      if (filters.ville && c.ville !== filters.ville) return false;
      if (filters.secteur && c.secteur !== filters.secteur) return false;
      if (
        filters.naf &&
        !c.naf.toLowerCase().includes(filters.naf.toLowerCase())
      )
        return false;
      if (!filters.statuts.has(c.statut)) return false;
      if (filters.contactDepuis) {
        if (!c.dernierContact || c.dernierContact < filters.contactDepuis)
          return false;
      }
      if (filters.relanceAvant) {
        if (!c.prochaineRelance || c.prochaineRelance > filters.relanceAvant)
          return false;
      }
      return true;
    });

    const { field, dir } = sort;
    result = [...result].sort((a, b) => {
      let av: string = a[field] ?? "";
      let bv: string = b[field] ?? "";
      if (field === "statut") {
        av = STATUTS[a.statut].label;
        bv = STATUTS[b.statut].label;
      }
      const cmp = String(av).localeCompare(String(bv), "fr");
      return dir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [companies, search, filters, sort]);
}
