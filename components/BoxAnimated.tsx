import * as THREE from "three";
import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";

export default function BoxAnimated() {
  const mesh = useRef<any>();

  useHelper(mesh, BoxHelper, "blue");

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}
