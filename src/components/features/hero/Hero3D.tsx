"use client";

import layers from "@/packages/configs/hero.config";
import "@/styles/features/hero/hero-3d.css";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef } from "react";

type LayerStyle = CSSProperties & Record<`--${string}`, string | number>;

type Orbit = {
  radius: number; // px
  duration: number; // seconds per full circle
  delay: number; // negative = start part-way round
  direction: "normal" | "reverse"; // clockwise / counter-clockwise
};

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

function createOrbit(index: number, maxRadius = 18): Orbit {
  const rand = mulberry32(index * 9973 + 17);
  const duration = 7 + rand() * 8; // 7s - 15s
  return {
    radius: 6 + rand() * (maxRadius - 6),
    duration,
    delay: -rand() * duration,
    direction: rand() > 0.5 ? "normal" : "reverse",
  };
}

const layerOrbits: Orbit[] = layers.map((_, index) => createOrbit(index + 1));
const characterOrbit: Orbit = createOrbit(99, 6); // character barely moves

function orbitStyle(orbit: Orbit): LayerStyle {
  return {
    "--orbit-r": `${orbit.radius.toFixed(2)}px`,
    "--orbit-duration": `${orbit.duration.toFixed(2)}s`,
    "--orbit-delay": `${orbit.delay.toFixed(2)}s`,
    "--orbit-dir": orbit.direction,
  };
}

const LERP = 0.08;

export function Hero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      scene.style.setProperty("--mx", current.x.toFixed(4));
      scene.style.setProperty("--my", current.y.toFixed(4));

      const settled =
        Math.abs(target.x - current.x) < 0.0005 &&
        Math.abs(target.y - current.y) < 0.0005;

      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);

    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-scene" ref={sceneRef}>
      <div className="hero-stage">
        <div className="hero-shadow" aria-hidden="true" />

        {layers.map((layer, index) => {
          const style: LayerStyle = {
            left: layer.left,
            top: layer.top,
            width: layer.width,
            "--z": layer.z,
            "--px": layer.px,
            "--py": layer.py,
            "--rz": `${layer.rz ?? 0}deg`,
          };

          return (
            <div key={layer.src} className="hero-layer" style={style}>
              <div
                className="hero-orbit"
                style={orbitStyle(layerOrbits[index])}
              >
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  width={300}
                  height={300}
                  priority
                  draggable={false}
                  className="hero-img"
                />
              </div>
            </div>
          );
        })}

        <div
          className="hero-layer hero-character"
          style={
            {
              // "--z": 80,
              // "--px": 10,
              // "--py": 6,
              // "--rz": "0deg",
            } satisfies LayerStyle
          }
        >
          <div className="hero-orbit " style={orbitStyle(characterOrbit)}>
            <Image
              src="/images/hero/hero-main.png"
              alt="3D illustrated character"
              width={1520}
              height={1520}
              priority
              draggable={false}
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
