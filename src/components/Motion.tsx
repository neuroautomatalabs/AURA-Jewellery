"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

type TiltProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export function Tilt3D({ children, className = "", maxTilt = 9 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
    setShine({ x: x * 100, y: y * 100, opacity: 0.55 });
  }

  function onLeave() {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
    setShine((s) => ({ ...s, opacity: 0 }));
  }

  return (
    <div
      ref={ref}
      className={`tilt-3d ${className}`.trim()}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <span
        className="tilt-shine"
        aria-hidden
        style={{
          opacity: shine.opacity,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.55), transparent 55%)`,
        }}
      />
    </div>
  );
}
