"use client";

import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Billboard, Html, TrackballControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import universitiesData from "@/data/universities";

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
      id="about"
      className="relative w-full flex flex-col md:flex-row-reverse items-center justify-between
                 py-16 md:py-24 px-6 md:px-10 lg:px-16 gap-10 bg-[#F4F3EF]"
    >
      {/* Text side */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start justify-center mb-6 md:mb-0">
        <p className="text-[#EC8644] text-xs font-semibold uppercase tracking-widest mb-4">
          Our Community
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-[var(--font-zuume)] font-bold text-[#293C4B] tracking-tight mb-5 leading-tight">
          Access the Inaccessible
        </h2>
        <p className="text-[#9CADB7] text-base sm:text-lg mb-8 max-w-md leading-relaxed">
          700+ students representing 50+ universities, 30+ companies pioneering
          the onchain future, and 50+ speakers delivering demos, workshops, and
          deep-dive sessions.
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { value: "700+", label: "Students" },
            { value: "50+", label: "Universities" },
            { value: "30+", label: "Sponsors" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#293C4B]/8 text-center"
            >
              <div className="text-xl font-bold text-[#EC8644]">{value}</div>
              <div className="text-xs text-[#9CADB7] font-medium">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/programs"
            className="bg-[#EC8644] text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#D4703A] transition-colors shadow-sm"
          >
            Build at UBC
          </a>
          <a
            href="https://lu.ma/x6apzbr8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#293C4B] font-semibold text-sm px-6 py-2.5 rounded-full border border-[#293C4B]/10 hover:shadow-md transition-all"
          >
            Get Tickets
          </a>
          <a
            href="#agenda"
            className="text-[#293C4B]/60 font-medium text-sm px-4 py-2.5 rounded-full border border-[#293C4B]/10 hover:text-[#293C4B] hover:bg-white transition-all"
          >
            View Agenda
          </a>
        </div>
      </div>

      {/* Cloud side */}
      <div className="w-full md:w-1/2 h-[420px] md:h-[580px] relative">
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
