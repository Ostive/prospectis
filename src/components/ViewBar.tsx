"use client";

import { ViewMode } from "@/lib/types";

interface Props {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  count: number;
  total: number;
}

export function ViewBar({ view, onViewChange, count, total }: Props) {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
      <div className="flex gap-1.5 rounded-full bg-bg p-1">
        <button
          onClick={() => onViewChange("map")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
            view === "map"
              ? "bg-surface text-text shadow-sm"
              : "text-muted hover:text-text"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
            <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
            <line x1="9" y1="4" x2="9" y2="17" />
            <line x1="15" y1="7" x2="15" y2="20" />
          </svg>
          Carte
        </button>
        <button
          onClick={() => onViewChange("list")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
            view === "list"
              ? "bg-surface text-text shadow-sm"
              : "text-muted hover:text-text"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Liste
        </button>
      </div>

      <p className="text-[12px] text-muted">
        {count === total ? (
          <>{total} entreprise{total > 1 ? "s" : ""}</>
        ) : (
          <>
            <span className="font-bold text-text">{count}</span> sur {total} entreprise{total > 1 ? "s" : ""}
          </>
        )}
      </p>
    </div>
  );
}
