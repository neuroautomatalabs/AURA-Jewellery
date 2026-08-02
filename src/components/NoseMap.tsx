"use client";

import { nosePiercings } from "@/data/piercings";
import type { NosePiercingId } from "@/lib/types";

type Props = {
  selectedId: NosePiercingId | null;
  onSelect: (id: NosePiercingId) => void;
};

/** Stylized animated nose — creative SVG, same interaction pattern as EarMap */
const HOTSPOTS: {
  id: NosePiercingId;
  cx: number;
  cy: number;
}[] = [
  { id: "bridge", cx: 140, cy: 78 },
  { id: "high-nostril", cx: 108, cy: 148 },
  { id: "nostril", cx: 100, cy: 188 },
  { id: "septum", cx: 140, cy: 205 },
  { id: "nose-tip", cx: 140, cy: 228 },
  { id: "nasallang", cx: 180, cy: 178 },
];

export function NoseMap({ selectedId, onSelect }: Props) {
  const selected = nosePiercings.find((p) => p.id === selectedId);

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-royal-deep via-[#0d2868] to-[#1a3a7a] shadow-2xl shadow-royal/30">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="ear-glow absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl" />
        </div>

        <svg
          viewBox="0 0 280 320"
          className="relative z-10 h-full w-full"
          role="img"
          aria-label="Animated nose piercing map"
        >
          <defs>
            <linearGradient id="noseSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3d4c4" />
              <stop offset="45%" stopColor="#e8b9a4" />
              <stop offset="100%" stopColor="#d49a82" />
            </linearGradient>
            <linearGradient id="zoneBridge" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#7eb6ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3d7dd6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="zoneNostril" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff9b8a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e06b5a" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="zoneSeptum" x1="0%" y1="0%" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4a0ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8b6ad6" stopOpacity="0.2" />
            </linearGradient>
            <filter id="noseShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="10"
                floodColor="#061440"
                floodOpacity="0.35"
              />
            </filter>
          </defs>

          {/* stylized nose outline */}
          <path
            d="M140 40
               C165 55 188 95 195 145
               C200 175 198 200 185 225
               C172 250 155 262 140 265
               C125 262 108 250 95 225
               C82 200 80 175 85 145
               C92 95 115 55 140 40 Z"
            fill="url(#noseSkin)"
            filter="url(#noseShadow)"
            className="ear-breathe"
            style={{ transformOrigin: "140px 160px" }}
          />

          {/* bridge highlight */}
          <path
            className="zone-pulse"
            d="M128 55 C145 52 155 70 152 100 C148 120 132 122 128 100 C125 78 122 58 128 55 Z"
            fill="url(#zoneBridge)"
          />

          {/* left nostril wing */}
          <path
            className="zone-pulse zone-delay-1"
            d="M95 155 C115 148 125 170 118 195 C112 215 95 218 90 198 C86 178 88 160 95 155 Z"
            fill="url(#zoneNostril)"
          />

          {/* right nostril wing */}
          <path
            className="zone-pulse zone-delay-2"
            d="M185 155 C165 148 155 170 162 195 C168 215 185 218 190 198 C194 178 192 160 185 155 Z"
            fill="url(#zoneNostril)"
          />

          {/* septum / tip zone */}
          <path
            className="zone-pulse zone-delay-3"
            d="M125 195 C145 190 155 205 148 230 C142 248 130 248 125 230 C120 212 118 200 125 195 Z"
            fill="url(#zoneSeptum)"
          />

          {/* nostril openings */}
          <ellipse
            cx="112"
            cy="210"
            rx="14"
            ry="10"
            fill="#c48872"
            opacity="0.45"
          />
          <ellipse
            cx="168"
            cy="210"
            rx="14"
            ry="10"
            fill="#c48872"
            opacity="0.45"
          />

          {/* center ridge line */}
          <path
            d="M140 55 C142 100 142 150 140 200"
            fill="none"
            stroke="#c48872"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {HOTSPOTS.map((spot) => {
            const active = selectedId === spot.id;
            const meta = nosePiercings.find((p) => p.id === spot.id);
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
          Tap a point on the nose
        </p>
      </div>

      <div className="mt-4 flex max-h-40 flex-wrap justify-center gap-1.5 overflow-y-auto sm:max-h-none">
        {nosePiercings.map((spot) => {
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
          Choose a glowing point — matching pieces appear below
        </p>
      )}
    </div>
  );
}
