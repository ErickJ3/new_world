import { useState, useEffect } from "react";

const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findKey = (key: string) => keys[key];

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: true }));
    };

    const handleKeyUp = (e: any) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: false }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return input;
};

export { useInput };
