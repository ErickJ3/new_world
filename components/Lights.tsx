import React, { useRef } from "react";

import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

const Lights: React.FC = () => {
  const lightRef = useRef<any>();

  useHelper(lightRef, DirectionalLightHelper, 10, "red");

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight ref={lightRef} position={[0, 20, 20]} castShadow />
    </>
  );
};

export default Lights;
