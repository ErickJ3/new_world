import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

import { useInput } from "../hooks/useInput";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const Player = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const { forward, backward, left, right, shift, jump } = useInput();

  const currentAction = useRef("");

  const [mesh, api] = useSphere(() => ({
    mass: 0,
    position: [0, 0, 0],
    type: "Dynamic",
  }));

  useEffect(() => {
    let action = "";
    let frontVector = new Vector3(0, 0, 0);
    let sideVector = new Vector3(0, 0, 0);
    let direction = new Vector3(0, 0, 0);

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

    frontVector.set(0, 0, Number(forward) - Number(backward));
    sideVector.set(Number(right) - Number(left), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(2);

    api.velocity.set(direction.x, 0, direction.z);

    console.log(direction.x, direction.z);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forward, backward, left, right, shift, jump]);

  return (
    <object3D scale={[1, 1, 1]} ref={mesh}>
      <primitive object={model.scene} />
    </object3D>
  );
};

export default Player;
