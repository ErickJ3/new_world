import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Stats, useTexture } from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";

const TextureSpheres = () => {
  const map = useTexture("./textures/rock-texture.jpg");

  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
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
      <Canvas shadows>
        <Stats />
        <axesHelper visible={testing} args={[2]} />
        <gridHelper args={[10, 10]} />
        <OrbitControls />
        <Lights />
        <TextureSpheres />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
