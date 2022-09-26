import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats, Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import Player from "../components/Player";

const Home: NextPage = () => {
  // const testing = true;

  return (
    <div className={styles.container}>
      <Canvas shadows>
        <Stats />
        {/* <axesHelper visible={testing} args={[2]} />
        <gridHelper args={[100, 100]} /> */}
        {/* <OrbitControls /> */}
        <Lights />
        {/* <OrbitControls /> */}
        <Physics>
          <Trees boundary={100} count={50} />
          <Player />
          <Ground />
        </Physics>
        <Sky />
      </Canvas>
    </div>
  );
};

export default Home;
