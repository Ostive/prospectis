"use client";

import { FormEvent, useState } from "react";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onLogin();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-navy via-navy-2 to-[#336b59] p-5">
      <div className="w-full max-w-[380px] rounded-2xl bg-surface p-9 px-8 shadow-2xl">
        <div className="mb-1.5 flex items-center gap-2.5">
          <svg
            className="h-[30px] w-[30px] flex-shrink-0 text-accent"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
          <h1 className="text-[22px] font-extrabold tracking-tight">
            Prospectis
          </h1>
        </div>
        <p className="mb-6 text-[13px] text-muted">
          Outil de prospection cartographique — réseau Slash Intérim
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="robin.hantzer@slash-interim.fr"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px] focus:outline-2 focus:outline-accent focus:outline-offset-1"
            />
          </div>
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="login-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-[13px] focus:outline-2 focus:outline-accent focus:outline-offset-1"
            />
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg border border-accent bg-accent px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-3.5 rounded-lg bg-accent-light p-2.5 px-3 text-[12px] leading-relaxed text-muted">
          Démo — saisissez n&apos;importe quelles valeurs pour accéder au
          tableau de bord. L&apos;authentification réelle sera branchée sur le
          système d&apos;accès défini par Slash Intérim.
        </p>
      </div>
    </div>
  );
}
