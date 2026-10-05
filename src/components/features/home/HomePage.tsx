import MarqueePanel from "@/app/dev/panels/MarqueePanel";
import { Hero3D } from "../hero/Hero3D";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Hero3D />
      <MarqueePanel />
    </>
  );
}
