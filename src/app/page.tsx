"use client";

import { useState, useCallback } from "react";
import { companies as initialCompanies } from "@/lib/companies";
import { Company, Filters, SortField, SortState, ViewMode, defaultFilters } from "@/lib/types";
import { useFilteredCompanies } from "@/lib/useFilteredCompanies";

import { LoginScreen } from "@/components/LoginScreen";
import { TopBar } from "@/components/TopBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { StatsBar } from "@/components/StatsBar";
import { ViewBar } from "@/components/ViewBar";
import { ListView } from "@/components/ListView";
import { MapView } from "@/components/MapView";
import { DetailPanel } from "@/components/DetailPanel";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters());
  const [view, setView] = useState<ViewMode>("map");
  const [sort, setSort] = useState<SortState>({ field: "nom", dir: "asc" });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; key: number } | null>(null);

  const filtered = useFilteredCompanies(companies, search, filters, sort);
  const selected = companies.find((c) => c.id === selectedId) ?? null;

  const handleSort = useCallback((field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" }
    );
  }, []);

  const handleSelect = useCallback((c: Company) => {
    setSelectedId((prev) => (prev === c.id ? null : c.id));
  }, []);

  const handleUpdate = useCallback((updated: Company) => {
    setCompanies((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }, []);

  const handleViewOnMap = useCallback((c: Company) => {
    setSelectedId(c.id);
    setView("map");
    setFlyTarget({ lat: c.lat, lng: c.lng, key: Date.now() });
  }, []);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar
        search={search}
        onSearchChange={setSearch}
        onLogout={() => setLoggedIn(false)}
        onOpenFilters={() => setSidebarOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar
          companies={companies}
          filters={filters}
          search={search}
          onFiltersChange={setFilters}
          onSearchChange={setSearch}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex flex-1 flex-col overflow-hidden">
          <StatsBar companies={filtered} />
          <ViewBar
            view={view}
            onViewChange={setView}
            count={filtered.length}
            total={companies.length}
          />

          <div className="relative flex flex-1 overflow-hidden">
            {view === "map" ? (
              <MapView
                companies={filtered}
                selectedId={selectedId}
                onSelect={handleSelect}
                flyTarget={flyTarget}
              />
            ) : (
              <ListView
                companies={filtered}
                selectedId={selectedId}
                onSelect={handleSelect}
                onViewOnMap={handleViewOnMap}
                sort={sort}
                onSort={handleSort}
              />
            )}

            {selected && (
              <DetailPanel
                company={selected}
                onClose={() => setSelectedId(null)}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
