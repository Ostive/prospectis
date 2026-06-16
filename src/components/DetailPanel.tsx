"use client";

import { useState } from "react";
import { Company, StatutKey, STATUTS, STATUT_KEYS, Commentaire } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatDate, daysFromToday, todayIso } from "@/lib/utils";

interface Props {
  company: Company | null;
  onClose: () => void;
  onUpdate: (updated: Company) => void;
}

function RelanceInfo({ date }: { date: string | null }) {
  if (!date) return <span className="text-muted">—</span>;
  const days = daysFromToday(date);
  const formatted = formatDate(date);
  if (days === null) return <span>{formatted}</span>;

  if (days < 0) {
    return (
      <span>
        {formatted}{" "}
        <span className="rounded-full bg-[#fdecec] px-2 py-0.5 text-[11px] font-bold text-[#b91c1c]">
          En retard de {Math.abs(days)}j
        </span>
      </span>
    );
  }
  if (days <= 3) {
    return (
      <span>
        {formatted}{" "}
        <span className="rounded-full bg-[#e8f1fb] px-2 py-0.5 text-[11px] font-bold text-[#1d4ed8]">
          Dans {days}j
        </span>
      </span>
    );
  }
  return <span>{formatted}</span>;
}

export function DetailPanel({ company, onClose, onUpdate }: Props) {
  const [commentText, setCommentText] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);

  if (!company) return null;

  function handleStatutChange(statut: StatutKey) {
    if (!company) return;
    onUpdate({ ...company, statut });
  }

  function handleAddComment() {
    if (!commentText.trim() || !company) return;
    const newComment: Commentaire = {
      auteur: "Robin Hantzer",
      date: todayIso(),
      texte: commentText.trim(),
    };
    onUpdate({
      ...company,
      commentaires: [...company.commentaires, newComment],
      dernierContact: todayIso(),
    });
    setCommentText("");
    setShowAddComment(false);
  }

  return (
    <div className="absolute inset-y-0 right-0 z-40 flex w-[400px] flex-col border-l border-border bg-surface shadow-panel transition-transform max-sm:w-full">
      {/* Header */}
      <div className="flex flex-shrink-0 items-start justify-between gap-2.5 border-b border-border p-4">
        <div className="min-w-0">
          <h2 className="text-[17px] font-extrabold leading-tight">{company.nom}</h2>
          <p className="mt-1 text-[12px] text-muted">
            {company.siren} · {company.naf} · {company.ville}
          </p>
          <div className="mt-2">
            <StatusBadge statut={company.statut} />
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg hover:bg-bg"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Statut */}
        <div className="mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Statut de prospection
          </h3>
          <div className="flex flex-wrap gap-2">
            {STATUT_KEYS.map((key) => {
              const conf = STATUTS[key];
              const active = company.statut === key;
              return (
                <button
                  key={key}
                  onClick={() => handleStatutChange(key)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold transition-all ${
                    active
                      ? "ring-2 ring-offset-1"
                      : "opacity-60 hover:opacity-90"
                  }`}
                  style={{
                    background: conf.bg,
                    color: conf.fg,
                    outline: active ? `2px solid ${conf.dot}` : undefined,
                    outlineOffset: active ? "2px" : undefined,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ background: conf.dot }}
                  />
                  {conf.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Contact
          </h3>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-2.5 text-[13px]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Interlocuteur</div>
              <div className="mt-0.5 font-semibold">{company.contact || "—"}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Téléphone</div>
              <div className="mt-0.5 font-semibold">
                {company.telephone ? (
                  <a href={`tel:${company.telephone}`} className="text-accent hover:underline">
                    {company.telephone}
                  </a>
                ) : "—"}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-[11px] uppercase tracking-wider text-muted">E-mail</div>
              <div className="mt-0.5 font-semibold">
                {company.email ? (
                  <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                    {company.email}
                  </a>
                ) : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Infos entreprise */}
        <div className="mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Informations entreprise
          </h3>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-2.5 text-[13px]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">SIREN</div>
              <div className="mt-0.5 font-semibold">{company.siren}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">SIRET</div>
              <div className="mt-0.5 font-semibold">{company.siret}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Code NAF</div>
              <div className="mt-0.5 font-semibold">{company.naf}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Secteur</div>
              <div className="mt-0.5 font-semibold">{company.secteur}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[11px] uppercase tracking-wider text-muted">Adresse</div>
              <div className="mt-0.5 font-semibold">
                {company.adresse}, {company.ville}
                <br />
                <span className="font-normal text-muted">
                  {company.departement} · {company.region}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Suivi */}
        <div className="mb-5">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Suivi prospection
          </h3>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-2.5 text-[13px]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Dernier contact</div>
              <div className="mt-0.5 font-semibold">{formatDate(company.dernierContact)}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Prochaine relance</div>
              <div className="mt-0.5 font-semibold">
                <RelanceInfo date={company.prochaineRelance} />
              </div>
            </div>
          </div>
        </div>

        {/* Commentaires */}
        <div className="mb-2">
          <h3 className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
            Commentaires ({company.commentaires.length})
          </h3>

          {company.commentaires.length === 0 && !showAddComment && (
            <p className="mb-3 text-[13px] italic text-muted">Aucun commentaire pour l&apos;instant.</p>
          )}

          {company.commentaires.map((c, i) => (
            <div key={i} className="mb-2 rounded-lg bg-bg p-3">
              <div className="mb-1 text-[11px] font-bold text-muted">
                {c.auteur} · {formatDate(c.date)}
              </div>
              <div className="text-[13px]">{c.texte}</div>
            </div>
          ))}

          {showAddComment ? (
            <div className="mt-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Saisissez un commentaire…"
                rows={3}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] focus:outline-2 focus:outline-accent focus:outline-offset-1"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="flex-1 rounded-lg border border-accent bg-accent px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => { setShowAddComment(false); setCommentText(""); }}
                  className="rounded-lg border border-border bg-surface px-3.5 py-2 text-[13px] font-semibold transition-colors hover:bg-bg"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddComment(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Ajouter un commentaire
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
