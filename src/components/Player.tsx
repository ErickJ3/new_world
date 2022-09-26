import { useEffect, useRef } from "react";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";

import { useInput } from "../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Quaternion } from "three";

let walkDirection = new Vector3();
let rotateAngle = new Vector3(0, 1, 0);
let rotateQuarternion = new Quaternion();
let cameraTarget = new Vector3();

const directionOffset = ({ forward, backward, left, right }) => {
  let directionOffset = 0;

  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; // w+a;
    } else if (right) {
      directionOffset = -Math.PI / 4; // w+d;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a;
    } else if (right) {
      directionOffset = -Math.PI / 4 + -Math.PI / 2; // s+d;
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; // a
  } else if (right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

const Player = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const { forward, backward, left, right, shift, jump } = useInput();

  const currentAction = useRef("");
  const controlRef = useRef<any>();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;

    if (controlRef.current) controlRef.current.target = cameraTarget;
  };

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

  useFrame((state, delta) => {
    if (
      currentAction.current == "running" ||
      currentAction.current == "walking"
    ) {
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );

      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const velocity = currentAction.current == "running" ? 10 : 5;

      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <primitive object={model.scene} />
    </>
  );
};

export default Player;
