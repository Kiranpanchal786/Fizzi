"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  {
    ssr: false,
  },
);

type Props = {};

export default function ViewCanvas({}: Props) {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 45,
        }}
      >
        {/** cube material code start */}
        {/* <mesh rotation={[0.5, 0.5, 0]} position={[1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"hotpink"} />
      </mesh> */}
        {/* <ambientLight intensity={2} />
      <spotLight intensity={3} position={[1, 1, 1]} /> */}
        {/** cube material code end */}

        <Suspense fallback={null}>
          <View.Port />
          <Perf />
        </Suspense>
      </Canvas>

      <Loader />
    </>
  );
}
