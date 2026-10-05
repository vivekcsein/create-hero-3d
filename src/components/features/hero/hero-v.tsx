"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  heroIcons,
  heroMain,
  heroOrbit,
} from "@/packages/configs/hero-v.config";
import { useHeroOrbit } from "@/packages/gsap/useHeroOrbit";
import { useReducedMotion } from "@/packages/hooks/useReducedMotion";

export function Hero3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useHeroOrbit(stageRef, heroOrbit, reducedMotion);

  return (
    <div className="hero-scene">
      <div className="hero-stage" ref={stageRef}>
        <div className="hero-shadow" aria-hidden="true" />

        <Image
          src={heroMain.src}
          alt={heroMain.alt}
          width={heroMain.width}
          height={heroMain.height}
          priority
          draggable={false}
          className="hero-main"
        />

        {heroIcons.map((icon) => (
          <div key={icon.src} className="hero-icon" data-orbit-item>
            <Image
              src={icon.src}
              alt={icon.alt}
              width={256}
              height={256}
              draggable={false}
              className="hero-icon-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
