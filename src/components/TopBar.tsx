"use client";

export function TopBar({
  search,
  onSearchChange,
  onLogout,
  onOpenFilters,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  onLogout: () => void;
  onOpenFilters: () => void;
}) {
  return (
    <header className="flex h-[60px] flex-shrink-0 items-center gap-3.5 bg-navy px-4 text-white">
      <button
        onClick={onOpenFilters}
        aria-label="Ouvrir les filtres"
        className="inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-lg hover:bg-white/10 lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-[18px] w-[18px]"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <circle cx="11" cy="18" r="2" fill="currentColor" stroke="none" />
        </svg>
      </button>

      <div className="flex flex-shrink-0 items-center gap-2">
        <svg
          className="h-6 w-6 text-accent"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" fill="#1c2b3f" />
        </svg>
        <div>
          <span className="text-[16px] font-extrabold tracking-tight">
            Prospectis
          </span>
          <div className="-mt-0.5 hidden text-[11px] text-white/55 sm:block">
            Slash Intérim — Prospection
          </div>
        </div>
      </div>

      <div className="flex h-[38px] max-w-[520px] flex-1 items-center gap-2 rounded-full border border-white/[.14] bg-white/10 px-3.5 focus-within:border-white/30 focus-within:bg-white/[.16]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-4 w-4 flex-shrink-0 text-white/70"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          type="text"
          placeholder="Entreprise, SIREN, SIRET, ville, code NAF…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/55"
        />
      </div>

      <div className="flex-1" />

      <div className="flex flex-shrink-0 items-center gap-2.5">
        <div className="hidden text-right leading-tight sm:block">
          <div className="text-[13px] font-bold">Robin Hantzer</div>
          <div className="text-[11px] text-white/60">
            Recruteur indépendant
          </div>
        </div>
        <button
          onClick={onLogout}
          aria-label="Se déconnecter"
          title="Se déconnecter"
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg hover:bg-white/10"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
