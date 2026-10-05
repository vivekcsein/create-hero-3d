export type HeroLayer = {
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
};

const layers: HeroLayer[] = [
  {
    src: "/images/hero/hero-t.png", // "Token intelligence" pill
    alt: "",
    left: "26.5%",
    top: "42%",
    width: 150,
    z: -40,
    px: -25,
    py: -10,
  },
  {
    src: "/images/hero/hero-c.png",
    alt: "",
    left: "3.5%",
    top: "40%",
    width: 100,
    z: -20,
    px: -18,
    py: -12,
    rz: -2,
  },
  {
    src: "/images/hero/hero-q.png", // the three coins as one image
    alt: "",
    left: "28.5%",
    top: "11%",
    width: 112,
    z: 140,
    px: 26,
    py: 20,
    rz: -6,
  },
  {
    src: "/images/hero/hero-r.png",
    alt: "",
    left: "77%",
    top: "22%",
    width: 82,
    z: 60,
    px: 35,
    py: 25,
    rz: 4,
  },
  {
    src: "/images/hero/hero-l.png", // openai coin + AI tile + hex
    alt: "",
    left: "77.5%",
    top: "46%",
    width: 140,
    z: 50,
    px: 30,
    py: 20,
    rz: -3,
  },
  {
    src: "/images/hero/hero-d.png", // split arrows, in front of the stool
    alt: "",
    left: "33%",
    top: "64%",
    width: 128,
    z: 110,
    px: 22,
    py: 14,
  },
];

export default layers;
