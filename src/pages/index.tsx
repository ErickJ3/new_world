import { useEffect, useRef } from "react";
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
import Trees from "../components/Trees";

import { useInput } from "../hooks/useInput";

const Player = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const { forward, backward, left, right, shift, jump } = useInput();

  const currentAction = useRef("");

  useEffect(() => {
    let action = "";

    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forward, backward, left, right, shift, jump]);

  return (
    <object3D position={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive object={model.scene} />
    </object3D>
  );
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
        <Trees boundary={100} count={50} />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home;
