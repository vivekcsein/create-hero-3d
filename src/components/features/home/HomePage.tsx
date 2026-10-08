import Hero from "./Hero";
import Hero3D from "./Hero3D";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Hero3D rotation={false} spread={0.75} />
      <Hero3D rotation={true} spread={0.75} />
    </>
  );
}
