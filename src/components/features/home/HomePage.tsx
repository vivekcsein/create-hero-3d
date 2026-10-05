import MarqueePanel from "@/app/dev/panels/MarqueePanel";
import { Hero3D } from "../hero/hero-x";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Hero3D spread={0.7} />
      <MarqueePanel />
    </>
  );
}
