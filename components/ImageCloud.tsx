"use client";

import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Billboard, Html, TrackballControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import universitiesData from "@/data/universities";
import { Button } from "@/components/ui/button";

interface University {
  name: string;
  coordinates: [number, number];
  logo: string;
  link: string;
}

function LogoBillboard({
  url,
  name,
  link,
  ...props
}: {
  url: string;
  name: string;
  link: string;
  position: THREE.Vector3;
}) {
  const texture = useLoader(THREE.TextureLoader, url);
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame(() => {
    if (ref.current) {
      ref.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.3 : 1, hovered ? 1.3 : 1, 1),
        0.1
      );
    }
  });

  return (
    <Billboard {...props}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      <Html>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            width: "40px",
            height: "40px",
            top: "-20px",
            left: "-20px",
            zIndex: 10,
            cursor: "pointer",
            display: "block",
          }}
        />
        <div style={{ display: "none" }}>{name}</div>
      </Html>
    </Billboard>
  );
}

function Cloud({ radius = 20 }: { radius?: number }) {
  const universities = universitiesData;

  const positions = useMemo(() => {
    const spherical = new THREE.Spherical();
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const logos: { position: THREE.Vector3; uni: University }[] = [];

    universities.forEach((uni, i) => {
      const phi = Math.acos(1 - (2 * i) / universities.length);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const pos = new THREE.Vector3().setFromSpherical(
        spherical.set(radius, phi, theta)
      );
      logos.push({ position: pos, uni });
    });

    return logos;
  }, [universities, radius]);

  return (
    <>
      {positions.map(({ position, uni }, i) => (
        <LogoBillboard
          key={i}
          url={uni.logo}
          name={uni.name}
          link={uni.link}
          position={position}
        />
      ))}
    </>
  );
}

function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.5, 0.5, 0]}>
      <Cloud radius={20} />
    </group>
  );
}

export default function ImageCloud() {
  return (
    <section
      className="relative w-full flex flex-col md:flex-row-reverse items-center justify-between
                 py-16 md:py-24 px-4 md:px-10 lg:px-16 bg-background text-foreground"
    >
      {/* Text Side */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start justify-center mb-10 md:mb-0">
        <h2 className="text-5xl font-mono font-bold italic md:text-6xl tracking-tight mb-4">
          Partner Universities
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          A constellation of innovation—our university partners span coast to
          coast, pushing blockchain forward in every region. Join the growing
          coalition.
        </p>
        <div className="flex flex-wrap sm:flex-row gap-4">
          <Button variant="default">Explore Partners</Button>
          <Button variant="secondary">Get Involved</Button>
        </div>
      </div>

      {/* Cloud Side */}
      <div className="w-full md:w-1/2 h-[500px] md:h-[600px] relative">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 75 }}>
          <Suspense fallback={null}>
            <RotatingGroup />
          </Suspense>
          <TrackballControls minDistance={35} maxDistance={50} />
        </Canvas>
      </div>
    </section>
  );
}
