"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import {
  BoxGeometry,
  Color,
  type Group,
  MathUtils,
  type Mesh,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { LOG, PARTS } from "./timber-parts";
import {
  createBarkTexture,
  createGrainTexture,
  createRingTexture,
} from "./wood-textures";

/**
 * intro  — boards start as a cut list and assemble into the chair once.
 * scroll — `progress` (0 → 1) drives log → sawn boards → chair.
 * still  — the finished chair, no motion.
 */
export type TimberMode = "intro" | "scroll" | "still";

type Progress = { current: number };

const span = (value: number, from: number, to: number) =>
  MathUtils.clamp((value - from) / (to - from), 0, 1);
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const IDENTITY = new Quaternion();
const scratchPos = new Vector3();
const scratchQuat = new Quaternion();

function useWoodMaterials() {
  const assets = useMemo(() => {
    const grain = createGrainTexture();
    const pale = new Color("#ffffff");
    const warm = new Color("#e2c193");

    const boards = PARTS.map((part, i) => {
      const map = grain.clone();
      map.repeat.set(part.size[0] / 0.55, 0.22 + ((i * 7) % 5) * 0.05);
      map.offset.set((i * 0.37) % 1, (i * 0.61) % 1);
      return new MeshStandardMaterial({
        map,
        color: pale.clone().lerp(warm, ((i * 5) % 7) / 6),
        roughness: 0.72,
      });
    });

    const end = new MeshStandardMaterial({ map: createRingTexture(), roughness: 0.85 });
    const barkMap = createBarkTexture();
    barkMap.repeat.set(3, 1);
    const bark = new MeshStandardMaterial({ map: barkMap, roughness: 1 });

    return { grain, boards, log: [bark, end, end], box: new BoxGeometry(1, 1, 1) };
  }, []);

  useEffect(
    () => () => {
      assets.box.dispose();
      for (const material of [...assets.boards, ...assets.log]) {
        material.map?.dispose();
        material.dispose();
      }
      assets.grain.dispose();
    },
    [assets],
  );

  return assets;
}

function TimberScene({ mode, progress }: { mode: TimberMode; progress?: Progress }) {
  const { boards, log: logMaterials, box } = useWoodMaterials();
  const group = useRef<Group>(null);
  const log = useRef<Mesh>(null);
  const meshes = useRef<(Mesh | null)[]>([]);
  const clock = useRef({ elapsed: 0, eased: mode === "scroll" ? 0 : mode === "intro" ? 0.5 : 1 });
  const viewportWidth = useThree((state) => state.viewport.width);
  const fit = Math.min(1, viewportWidth / 1.5);

  const pose = (p: number, sway: number) => {
    const saw = span(p, 0.06, 0.42);
    const build = span(p, 0.56, 0.94);

    PARTS.forEach((part, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const sawn = easeOut(span(saw, i * 0.03, i * 0.03 + 0.58));
      const built = smooth(span(build, i * 0.045, i * 0.045 + 0.37));

      scratchPos.lerpVectors(part.inLog, part.onBench, sawn).lerp(part.inChair, built);
      scratchPos.y += Math.sin(built * Math.PI) * 0.24 + Math.sin(sawn * Math.PI) * 0.06;
      scratchQuat.slerpQuaternions(IDENTITY, part.benchQuat, sawn).slerp(part.chairQuat, built);

      mesh.position.copy(scratchPos);
      mesh.quaternion.copy(scratchQuat);
    });

    if (log.current) {
      const girth = 1 - smooth(span(saw, 0, 0.6));
      log.current.visible = girth > 0.002;
      log.current.scale.set(girth, 1, girth);
    }

    if (group.current) {
      const done = smooth(build);
      group.current.rotation.y = MathUtils.lerp(-0.6, 0.62, smooth(p)) + sway;
      group.current.position.y = -MathUtils.lerp(0.2, 0.46, done) * fit;
    }
  };

  useLayoutEffect(() => {
    pose(clock.current.eased, 0);
    // Initial pose only; useFrame takes over from here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    const c = clock.current;
    const dt = Math.min(delta, 0.05);
    c.elapsed += dt;

    let sway = 0;
    if (mode === "intro") {
      c.eased = 0.5 + 0.5 * span(c.elapsed, 0.5, 3.4);
      const settled = smooth(span(c.elapsed, 2.6, 5));
      sway = settled * (Math.sin((c.elapsed - 2.6) * 0.32) * 0.5 + state.pointer.x * 0.22);
    } else if (mode === "scroll") {
      c.eased = MathUtils.damp(c.eased, progress?.current ?? 0, 5, dt);
      sway = Math.sin(c.elapsed * 0.3) * 0.08;
    } else {
      c.eased = 1;
    }

    pose(c.eased, sway);
  });

  return (
    <group ref={group} scale={fit}>
      <mesh
        ref={log}
        position={[0, LOG.radius, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={logMaterials}
        castShadow
      >
        <cylinderGeometry args={[LOG.radius, LOG.radius, LOG.length, 56]} />
      </mesh>

      {PARTS.map((part, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            meshes.current[i] = mesh;
          }}
          geometry={box}
          material={boards[i]}
          scale={part.size}
          castShadow
          receiveShadow
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.34} />
      </mesh>
    </group>
  );
}

export default function TimberCanvas({
  mode,
  progress,
  className,
}: {
  mode: TimberMode;
  progress?: Progress;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const effectiveMode = reduceMotion ? "still" : mode;

  // Stop rendering frames while the canvas is off screen.
  useEffect(() => {
    if (!wrap.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(wrap.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`${className ?? ""} transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        shadows="percentage"
        dpr={[1, 1.75]}
        frameloop={effectiveMode === "still" ? "demand" : inView ? "always" : "never"}
        camera={{ position: [0, 1.05, 3.4], fov: 26, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0.04, 0);
          setReady(true);
        }}
      >
        <hemisphereLight args={["#fff3df", "#22342b", 1.15]} />
        <directionalLight
          position={[2.6, 4, 2.4]}
          intensity={2.6}
          color="#fff1dc"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-1.6}
          shadow-camera-right={1.6}
          shadow-camera-top={1.6}
          shadow-camera-bottom={-1.6}
          shadow-camera-near={0.5}
          shadow-camera-far={10}
          shadow-bias={-0.0004}
          shadow-normalBias={0.02}
        />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.7} color="#cfe3d6" />
        <TimberScene mode={effectiveMode} progress={progress} />
      </Canvas>
    </div>
  );
}
