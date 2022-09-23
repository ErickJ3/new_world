import { useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import Lights from "../components/Lights";
import Ground from "../components/Ground";

const Player = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions?.defeat?.play();
  }, []);

  return <primitive object={model.scene} />;
};

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
        <Player />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
