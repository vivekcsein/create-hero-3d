import MarqueePanel from "@/app/dev/panels/MarqueePanel";
import Hero from "./Hero";
import Hero3D from "./Hero3D";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Hero3D rotation={false} spread={0.75} />
      <MarqueePanel />
    </>
  );
}
