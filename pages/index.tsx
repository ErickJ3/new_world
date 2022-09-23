import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Stats, useTexture } from "@react-three/drei";

const TextureSpheres = () => {
  const map = useTexture("./textures/rock-texture.jpg");

  return (
    <>
      <mesh scale={[1, 1, 1]} position={[-1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial map={map} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial map={map} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[1, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial map={map} />
      </mesh>
    </>
  );
};

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className={styles.container}>
      <Canvas>
        <Stats />
        <axesHelper visible={testing} args={[2]} />
        <gridHelper args={[10, 10]} />
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 5, 5]} />
        <TextureSpheres />
      </Canvas>
    </div>
  );
};

export default Home;
