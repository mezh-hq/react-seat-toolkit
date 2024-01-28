import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const styles = `*{
  cursor: none;
}`;

export const Cursor = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const Cursor = useSelector((state) => state.global.cursor);
  const cursorHidden = useSelector((state) => state.global.cursorHidden);

  const move = (e) => {
    const touchEvent = e.touches ? e.touches[0] : null;
    const x = !isTouchDevice ? e.clientX : touchEvent?.clientX || 0;
    const y = !isTouchDevice ? e.clientY : touchEvent?.clientY || 0;
    setCursorX(x);
    setCursorY(y);
  };

  useEffect(() => {
    try {
      document.createEvent("TouchEvent");
      setIsTouchDevice(true);
    } catch (e) {
      setIsTouchDevice(false);
    }
  }, []);

  useEffect(() => {
    if (Cursor) {
      document.addEventListener("pointermove", move);
      document.addEventListener("touchmove", move);
      return () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("touchmove", move);
      };
    }
  }, [Cursor]);

  if (!Cursor) return null;

  return (
    <>
      {!cursorHidden && <style>{styles}</style>}
      <Cursor
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
          position: "absolute",
          pointerEvents: "none",
          transform: "translate(-39%, -27%)",
          opacity: cursorHidden ? 0 : 1
        }}
      />
    </>
  );
};

export default Cursor;
