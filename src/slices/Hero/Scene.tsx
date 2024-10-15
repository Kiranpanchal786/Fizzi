"use client";

import FloatingCan from "@/components/FloatingCan";
import { useGSAP } from "@gsap/react";
import { Environment, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { State, useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP);

type Props = {};

const Scene = (props: Props) => {
  const isReady = useStore((state: State) => state.isReady);

  const can1Ref = useRef<Group>(null),
    can2Ref = useRef<Group>(null),
    can3Ref = useRef<Group>(null),
    can4Ref = useRef<Group>(null),
    can5Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null),
    can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED: number = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    //Animation set can starting location
    gsap.set(can1Ref.current.position, {
      x: -1.5,
    });
    gsap.set(can1Ref.current.rotation, {
      z: -0.5,
    });

    gsap.set(can2Ref.current.position, {
      x: 1.5,
    });
    gsap.set(can2Ref.current.rotation, {
      z: 0.5,
    });

    gsap.set(can3Ref.current.position, {
      y: 5,
      z: 2,
    });

    gsap.set(can4Ref.current.position, {
      x: 2,
      y: 4,
      z: 2,
    });
    gsap.set(can5Ref.current.position, {
      y: 5,
    });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });

    introTl.from(can1GroupRef.current.position, { y: -5, x: 1 }, 0);
    introTl.from(can1GroupRef.current.rotation, { z: 3 }, 0);
    introTl.from(can2GroupRef.current.position, { y: -5, x: 1 }, 0);
    introTl.from(can2GroupRef.current.rotation, { z: 3 }, 0);

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    if (window.scrollY < 20) {
      scrollTl
        //Rotate can group - 360 degrees
        .to(groupRef.current.rotation, { y: Math.PI * 2 })

        //can 1 - black cherry
        .to(can1Ref.current?.position, { x: -0.2, y: -0.7, z: -2 }, 0)
        .to(can1Ref.current.rotation, { z: 0.3 }, 0)

        //can 2 - lemon lime
        .to(can2Ref.current?.position, { x: 1, y: -0.2, z: -1 }, 0)
        .to(can2Ref.current.rotation, { z: 0 }, 0)

        //can 3 - grape
        .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
        .to(can3Ref.current.rotation, { z: -0.1 }, 0)

        //can 4 - strawberry lemonade
        .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
        .to(can4Ref.current.rotation, { z: 0.3 }, 0)

        //can 5 - watermelon
        .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
        .to(can5Ref.current.rotation, { z: -0.25 }, 0)

        .to(
          groupRef.current.position,
          { x: 1, duration: 3, ease: "sine.inOut" },
          1.3,
        );
    }

    //Scroll trigger for can rotation
    //.to(groupRef.current.rotation, { y: Math.PI * 2 }, { repeat: -1, duration: 60 })

    //Scroll
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="blackCherry"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          flavor="lemonLime"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />
      <FloatingCan
        ref={can4Ref}
        flavor="strawberryLemonade"
        floatSpeed={FLOAT_SPEED}
      />
      <FloatingCan ref={can5Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />

      {/* <OrbitControls /> */}
      <Environment files={"hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;