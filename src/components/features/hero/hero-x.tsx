"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useRef } from "react";
import {
  type HeroV2Layer,
  type HeroV2Motion,
  heroV2Layers,
  heroV2Main,
  heroV2Motion,
} from "@/packages/configs/hero-x.config";
import { useHeroParallax } from "@/packages/gsap/useHeroParallax";

// seeded PRNG: "random" but identical on server and client (no hydration mismatch)
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createDrift(layer: HeroV2Layer, index: number, m: HeroV2Motion) {
  const rand = mulberry32(index * 9973 + 17);
  const { minRadius, maxRadius, minDuration, maxDuration } = m.drift;
  return {
    radius: layer.drift?.radius ?? minRadius + rand() * (maxRadius - minRadius),
    duration:
      layer.drift?.duration ??
      minDuration + rand() * (maxDuration - minDuration),
    dir: rand() > 0.5 ? 1 : -1,
    phase: rand() * Math.PI * 2,
  };
}

function ParallaxLayer({
  layer,
  index,
  className,
  main = false,
  children,
}: {
  layer: HeroV2Layer;
  index: number;
  className?: string;
  /** main image: centred, sized by CSS, not affected by spread */
  main?: boolean;
  children: ReactNode;
}) {
  const drift = createDrift(layer, index, heroV2Motion);

  return (
    <div
      className={className ? `hero-px-layer ${className}` : "hero-px-layer"}
      style={{
        // scale the distance from the stage centre (50% / 50%) by --spread-*
        left: main
          ? layer.left
          : `calc(50% + (${layer.left} - 50%) * var(--spread-x))`,
        top: main
          ? layer.top
          : `calc(50% + (${layer.top} - 50%) * var(--spread-y))`,
        width: main ? undefined : layer.width,
      }}
      data-px-layer
      data-z={layer.z}
      data-px={layer.px}
      data-py={layer.py}
      data-rz={layer.rz ?? 0}
    >
      <div
        className="hero-px-drift"
        data-px-drift
        data-r={drift.radius.toFixed(2)}
        data-d={drift.duration.toFixed(2)}
        data-dir={drift.dir}
        data-phase={drift.phase.toFixed(3)}
      >
        {children}
      </div>
    </div>
  );
}

type Hero3DV2Props = {
  /** distance of icons from the centre image: 1 = config positions, <1 closer, >1 farther */
  spread?: number;
  /** override spread on one axis only */
  spreadX?: number;
  spreadY?: number;
  className?: string;
};

export function Hero3D({
  spread = 0.8,
  spreadX,
  spreadY,
  className,
}: Hero3DV2Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const style = {
    "--spread-x": spreadX ?? spread,
    "--spread-y": spreadY ?? spread,
  } as CSSProperties;

  useHeroParallax(sceneRef, heroV2Motion);

  return (
    <div
      className={className ? `hero-px-scene ${className}` : "hero-px-scene"}
      ref={sceneRef}
      style={style}
    >
      <div className="hero-px-stage" data-px-stage>
        <div className="hero-px-shadow" aria-hidden="true" />

        {heroV2Layers.map((layer, index) => (
          <ParallaxLayer key={layer.src} layer={layer} index={index + 1}>
            <Image
              src={layer.src}
              alt={layer.alt}
              width={300}
              height={300}
              draggable={false}
              className="hero-px-img"
            />
          </ParallaxLayer>
        ))}

        <ParallaxLayer
          layer={heroV2Main}
          index={99}
          className="hero-px-main"
          main
        >
          <Image
            src={heroV2Main.src}
            alt={heroV2Main.alt}
            width={1600}
            height={1200}
            priority
            draggable={false}
            className="hero-px-img"
          />
        </ParallaxLayer>
      </div>
    </div>
  );
}
