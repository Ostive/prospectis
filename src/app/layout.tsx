import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prospectis – Prospection cartographique",
  description: "Outil de prospection cartographique — réseau Slash Intérim",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="text-text bg-bg">{children}</body>
    </html>
  );
}
