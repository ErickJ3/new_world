import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className={styles.container}>
      <Canvas shadows>
        <Stats />
        <axesHelper visible={testing} args={[2]} />
        <gridHelper args={[100, 100]} />
        <OrbitControls />
        <Lights />
        <Trees boundary={100} count={50} />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
