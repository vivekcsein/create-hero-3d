export type HeroIcon = {
  src: string;
  alt: string;
};

export type HeroOrbitConfig = {
  /** seconds for one full revolution (higher = slower) */
  duration: number;
  /** orbit radius as a fraction of stage width / height */
  radiusX: number;
  radiusY: number;
  /** how much icons grow/shrink with depth (0 = flat) */
  depthScale: number;
  /** start angle in deg (-90 = first icon at the top) */
  startAngle: number;
  /** 1 = clockwise, -1 = counter-clockwise */
  direction: 1 | -1;
};

export const heroMain = {
  src: "/images/hero/hero-main.png",
  alt: "3D illustrated developer desk setup",
  width: 1600,
  height: 1200,
};

/** Add a new icon = add one line here. Spacing is recalculated automatically. */
export const heroIcons: HeroIcon[] = [
  { src: "/images/hero/hero-r.png", alt: "React" },
  { src: "/images/hero/hero-l.png", alt: "Automation" },
  { src: "/images/hero/hero-w.png", alt: "TypeScript" },
  { src: "/images/hero/hero-t.png", alt: "AI" },
  { src: "/images/hero/hero-c.png", alt: "Code" },
  { src: "/images/hero/hero-q.png", alt: "Config" },
  { src: "/images/hero/hero-d.png", alt: "Database" },
];

export const heroOrbit: HeroOrbitConfig = {
  duration: 120,
  radiusX: 0.42,
  radiusY: 0.38,
  depthScale: 0.1,
  startAngle: -90,
  direction: 1,
};
