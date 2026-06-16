"use client";

import { useEffect, useRef } from "react";
import { Company, STATUTS } from "@/lib/types";
import "leaflet/dist/leaflet.css";

interface FlyTarget { lat: number; lng: number; key: number }

interface Props {
  companies: Company[];
  selectedId: number | null;
  onSelect: (c: Company) => void;
  flyTarget?: FlyTarget | null;
}

export function MapView({ companies, selectedId, onSelect, flyTarget }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Refs pour éviter les closures périmées
  const companiesRef = useRef(companies);
  const selectedIdRef = useRef(selectedId);
  const onSelectRef = useRef(onSelect);
  useEffect(() => { companiesRef.current = companies; });
  useEffect(() => { selectedIdRef.current = selectedId; });
  useEffect(() => { onSelectRef.current = onSelect; });

  function renderMarkers(L: any, map: any) {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    companiesRef.current.forEach((c) => {
      const conf = STATUTS[c.statut];
      const isSelected = c.id === selectedIdRef.current;
      const size = isSelected ? 18 : 14;

      const iconHtml = `<div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:${conf.dot};
        border:${isSelected ? 3 : 2}px solid #fff;
        box-shadow:0 0 0 ${isSelected ? 2 : 1}px ${conf.dot},0 2px 6px rgba(0,0,0,.25);
        transition:all .15s;
      "></div>`;

      const icon = L.divIcon({
        html: iconHtml,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([c.lat, c.lng], { icon })
        .addTo(map)
        .bindTooltip(
          `<strong style="font-size:13px">${c.nom}</strong><br>
           <span style="font-size:12px;color:#728094">${c.ville} · ${c.secteur}</span>`,
          { direction: "top", offset: [0, -10], className: "leaflet-tooltip-custom" }
        )
        .on("click", () => onSelectRef.current(c));

      markersRef.current.push(marker);
    });
  }

  // Initialisation de la carte (une seule fois)
  useEffect(() => {
    if (typeof window === "undefined" || mapRef.current) return;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [46.6, 2.3],
        zoom: 6,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = { map, L };
      renderMarkers(L, map); // premier affichage dès que la carte est prête
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mise à jour des marqueurs quand les données changent
  useEffect(() => {
    if (!mapRef.current) return;
    renderMarkers(mapRef.current.L, mapRef.current.map);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies, selectedId]);

  // Centrer la carte sur une cible (depuis la vue liste)
  useEffect(() => {
    if (!flyTarget || !mapRef.current) return;
    mapRef.current.map.flyTo([flyTarget.lat, flyTarget.lng], 14, { duration: 0.8 });
  }, [flyTarget]);

  return (
    <div className="relative flex-1 min-h-0">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Legend */}
      <div className="absolute bottom-3.5 left-3.5 z-[400] rounded-lg border border-border bg-white/95 px-3 py-2.5 shadow-soft text-[12px]">
        <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-muted">
          Légende
        </div>
        {Object.entries(STATUTS).map(([key, conf]) => (
          <div key={key} className="flex items-center gap-2 py-0.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full border-2 border-white flex-shrink-0"
              style={{
                background: conf.dot,
                boxShadow: `0 0 0 1px ${conf.dot}`,
              }}
            />
            {conf.label}
          </div>
        ))}
      </div>
    </div>
  );
}
