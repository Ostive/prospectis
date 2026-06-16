export type StatutKey =
  | "a_prospecter"
  | "contactee"
  | "interessee"
  | "non_interessee"
  | "a_relancer";

export interface StatutConfig {
  label: string;
  dot: string;
  bg: string;
  fg: string;
}

export const STATUTS: Record<StatutKey, StatutConfig> = {
  a_prospecter: {
    label: "À prospecter",
    dot: "#9aa3ad",
    bg: "#eef0f2",
    fg: "#5b6675",
  },
  contactee: {
    label: "Contactée",
    dot: "#f6a623",
    bg: "#fef3e2",
    fg: "#a35b07",
  },
  interessee: {
    label: "Intéressée",
    dot: "#2fae60",
    bg: "#e6f6ec",
    fg: "#15803d",
  },
  non_interessee: {
    label: "Non intéressée",
    dot: "#e5544c",
    bg: "#fdecec",
    fg: "#b91c1c",
  },
  a_relancer: {
    label: "À relancer",
    dot: "#3b82d6",
    bg: "#e8f1fb",
    fg: "#1d4ed8",
  },
};

export const STATUT_KEYS = Object.keys(STATUTS) as StatutKey[];

export interface Commentaire {
  auteur: string;
  date: string; // ISO yyyy-mm-dd
  texte: string;
}

export interface Company {
  id: number;
  nom: string;
  siren: string;
  siret: string;
  adresse: string;
  ville: string;
  departement: string;
  region: string;
  secteur: string;
  naf: string;
  lat: number;
  lng: number;
  contact: string;
  telephone: string;
  email: string;
  statut: StatutKey;
  dernierContact: string | null;
  prochaineRelance: string | null;
  commentaires: Commentaire[];
}

export interface Filters {
  region: string;
  departement: string;
  ville: string;
  secteur: string;
  naf: string;
  statuts: Set<StatutKey>;
  contactDepuis: string;
  relanceAvant: string;
}

export const defaultFilters = (): Filters => ({
  region: "",
  departement: "",
  ville: "",
  secteur: "",
  naf: "",
  statuts: new Set(STATUT_KEYS),
  contactDepuis: "",
  relanceAvant: "",
});

export type ViewMode = "map" | "list";

export type SortField =
  | "nom"
  | "ville"
  | "secteur"
  | "statut"
  | "dernierContact"
  | "prochaineRelance";

export interface SortState {
  field: SortField;
  dir: "asc" | "desc";
}
