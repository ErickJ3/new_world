import React from "react";

const Ground: React.FC = () => {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#458745"} />
      </mesh>
    </>
  );
};

export default Ground;
