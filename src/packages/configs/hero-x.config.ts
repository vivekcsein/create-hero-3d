export type HeroV2Layer = {
  src: string;
  alt: string;
  /** position inside the stage */
  left: string;
  top: string;
  /** rendered width in px */
  width: number;
  /** translateZ in px (real 3D depth) */
  z: number;
  /** pointer parallax strength in px */
  px: number;
  py: number;
  /** resting rotation in deg */
  rz?: number;
  /** override the auto drift for this layer */
  drift?: { radius: number; duration: number };
};

export type HeroV2Motion = {
  /** max stage tilt in deg at the pointer edge */
  tiltX: number;
  tiltY: number;
  /** seconds the pointer motion takes to settle (higher = softer) */
  follow: number;
  /** slow in-place drift: radius px, seconds per lap */
  drift: {
    minRadius: number;
    maxRadius: number;
    minDuration: number;
    maxDuration: number;
  };
};

export const heroV2Main: HeroV2Layer = {
  src: "/images/hero/hero-main.png",
  alt: "3D illustrated character",
  left: "50%",
  top: "50%",
  width: 1600, // source pixels; rendered size comes from CSS
  z: 80,
  px: 10,
  py: 6,
  drift: { radius: 4, duration: 60 },
};

/** Add a new icon = add one object here. left/top = % of the stage. */
export const heroV2Layers: HeroV2Layer[] = [
  {
    src: "/images/hero/hero-t.png",
    alt: "",
    left: "8%",
    top: "14%",
    width: 140,
    z: -40,
    px: -25,
    py: -10,
  },
  {
    src: "/images/hero/hero-c.png",
    alt: "",
    left: "3%",
    top: "48%",
    width: 100,
    z: -20,
    px: -18,
    py: -12,
    rz: -2,
  },
  {
    src: "/images/hero/hero-q.png",
    alt: "",
    left: "43%",
    top: "5%",
    width: 112,
    z: 140,
    px: 26,
    py: 20,
    rz: -6,
  },
  {
    src: "/images/hero/hero-r.png",
    alt: "",
    left: "80%",
    top: "11%",
    width: 82,
    z: 60,
    px: 35,
    py: 25,
    rz: 4,
  },
  {
    src: "/images/hero/hero-l.png",
    alt: "",
    left: "80%",
    top: "50%",
    width: 130,
    z: 50,
    px: 30,
    py: 20,
    rz: -3,
  },
  {
    src: "/images/hero/hero-d.png",
    alt: "",
    left: "60%",
    top: "76%",
    width: 120,
    z: 110,
    px: 22,
    py: 14,
  },
  {
    src: "/images/hero/hero-w.png",
    alt: "",
    left: "20%",
    top: "74%",
    width: 105,
    z: 90,
    px: -22,
    py: 16,
    rz: 3,
  },
];

export const heroV2Motion: HeroV2Motion = {
  tiltX: 4,
  tiltY: 7,
  follow: 0.9,
  drift: { minRadius: 8, maxRadius: 16, minDuration: 35, maxDuration: 55 },
};
