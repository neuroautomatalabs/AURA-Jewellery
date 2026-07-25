"use client";

import { piercings } from "@/data/piercings";
import type { PiercingId } from "@/lib/types";

type Props = {
  selectedId: PiercingId | null;
  onSelect: (id: PiercingId) => void;
};

/** Stylized animated ear — creative SVG, not a labeled photo */
const HOTSPOTS: {
  id: PiercingId;
  cx: number;
  cy: number;
  zone: string;
}[] = [
  { id: "aura-helix", cx: 168, cy: 42, zone: "helix" },
  { id: "helix", cx: 198, cy: 88, zone: "helix" },
  { id: "low-helix", cx: 205, cy: 168, zone: "rim" },
  { id: "forward-helix", cx: 95, cy: 95, zone: "helix" },
  { id: "aura-rook", cx: 145, cy: 72, zone: "inner" },
  { id: "hidden-rook", cx: 128, cy: 85, zone: "inner" },
  { id: "rook", cx: 138, cy: 105, zone: "inner" },
  { id: "contraconch", cx: 170, cy: 125, zone: "bowl" },
  { id: "conch", cx: 160, cy: 155, zone: "bowl" },
  { id: "daith", cx: 125, cy: 140, zone: "inner" },
  { id: "tragus", cx: 100, cy: 158, zone: "front" },
  { id: "antitragus", cx: 148, cy: 190, zone: "front" },
  { id: "aura-lobe", cx: 155, cy: 225, zone: "lobe" },
  { id: "lobe-lower", cx: 158, cy: 258, zone: "lobe" },
];

export function EarMap({ selectedId, onSelect }: Props) {
  const selected = piercings.find((p) => p.id === selectedId);

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-royal-deep via-[#0d2868] to-[#1a3a7a] shadow-2xl shadow-royal/30">
        {/* soft ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="ear-glow absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl" />
        </div>

        <svg
          viewBox="0 0 280 320"
          className="relative z-10 h-full w-full"
          role="img"
          aria-label="Animated ear piercing map"
        >
          <defs>
            <linearGradient id="earSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3d4c4" />
              <stop offset="45%" stopColor="#e8b9a4" />
              <stop offset="100%" stopColor="#d49a82" />
            </linearGradient>
            <linearGradient id="zoneHelix" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#7eb6ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3d7dd6" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="zoneBowl" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff9b8a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e06b5a" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="zoneLobe" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4a0ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b6ad6" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="zoneInner" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#7dffc8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3db892" stopOpacity="0.2" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="10"
                floodColor="#061440"
                floodOpacity="0.35"
              />
            </filter>
          </defs>

          {/* stylized outer ear */}
          <path
            d="M150 28
               C210 32 235 78 232 130
               C230 175 218 205 200 230
               C185 250 175 268 168 290
               C160 305 145 308 135 295
               C120 275 118 250 122 228
               C90 220 72 190 78 155
               C82 125 95 105 112 88
               C100 70 105 48 125 36
               C135 30 142 28 150 28 Z"
            fill="url(#earSkin)"
            filter="url(#softShadow)"
            className="ear-breathe"
          />

          {/* inner ear hollow */}
          <path
            d="M130 95
               C155 88 185 100 190 130
               C195 160 180 185 155 195
               C135 202 115 185 118 160
               C120 140 122 110 130 95 Z"
            fill="#d4a08c"
            opacity="0.55"
          />

          {/* animated colour zones */}
          <path
            className="zone-pulse"
            d="M148 40 C195 48 218 90 215 130 C212 150 205 165 195 175 L175 120 C168 90 155 55 148 40 Z"
            fill="url(#zoneHelix)"
          />
          <path
            className="zone-pulse zone-delay-1"
            d="M135 115 C165 108 185 130 178 160 C172 185 150 190 135 175 C122 160 122 130 135 115 Z"
            fill="url(#zoneBowl)"
          />
          <path
            className="zone-pulse zone-delay-2"
            d="M128 210 C155 205 175 230 168 265 C162 285 145 288 138 270 C128 245 118 220 128 210 Z"
            fill="url(#zoneLobe)"
          />
          <path
            className="zone-pulse zone-delay-3"
            d="M118 100 C140 95 150 120 142 145 C135 160 115 155 112 135 C110 118 112 105 118 100 Z"
            fill="url(#zoneInner)"
          />

          {/* antihelix fold line */}
          <path
            d="M140 95 C155 110 160 140 150 165"
            fill="none"
            stroke="#c48872"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* hotspots */}
          {HOTSPOTS.map((spot) => {
            const active = selectedId === spot.id;
            const meta = piercings.find((p) => p.id === spot.id);
            return (
              <g
                key={spot.id}
                className="cursor-pointer"
                onClick={() => onSelect(spot.id)}
                role="button"
                tabIndex={0}
                aria-label={meta?.name}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(spot.id);
                  }
                }}
              >
                {active && (
                  <circle
                    cx={spot.cx}
                    cy={spot.cy}
                    r="16"
                    fill="none"
                    stroke="#e0bc4a"
                    strokeWidth="1.5"
                    className="hotspot-ring"
                  />
                )}
                <circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={active ? 8 : 6}
                  fill={active ? "#e0bc4a" : "#fff"}
                  stroke={active ? "#0b1f5c" : "#e0bc4a"}
                  strokeWidth="2"
                  className={active ? "" : "hotspot-breathe"}
                />
              </g>
            );
          })}
        </svg>

        <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
          Tap a point on the ear
        </p>
      </div>

      <div className="mt-4 flex max-h-40 flex-wrap justify-center gap-1.5 overflow-y-auto sm:max-h-none">
        {piercings.map((spot) => {
          const active = selectedId === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => onSelect(spot.id)}
              className={`min-h-9 rounded-full px-3 text-[11px] font-semibold uppercase tracking-wide transition ${
                active
                  ? "bg-gold text-royal-deep shadow-md"
                  : "bg-white text-ink-muted ring-1 ring-line hover:ring-royal/40 hover:text-royal"
              }`}
            >
              {spot.shortName}
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="animate-rise mt-4 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft to-white px-4 py-4 text-center shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            Selected placement
          </p>
          <h3 className="font-display mt-1 text-2xl text-royal">
            {selected.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {selected.description}
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            Healing · {selected.healingWeeks}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-center text-sm text-ink-muted">
          Choose a glowing point — matching studs appear below
        </p>
      )}
    </div>
  );
}
