import React from "react";

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 20, 20]} castShadow />
    </>
  );
};

export default Lights;
