import { createContext, useCallback, useContext, useEffect, useState } from "react";

const styles = `*{
    cursor: none;
}`;

const CursorContext = createContext({
  setCursor: () => console.info("not implemented"),
  clearCursor: () => console.info("not implemented")
});

export const CursorProvider = ({ children }) => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [Cursor, setCursor] = useState(null);

  const clearCursor = useCallback(() => setCursor(null), []);

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
      document.addEventListener("mousemove", move);
      document.addEventListener("touchmove", move);
      return () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("touchmove", move);
      };
    }
  }, [Cursor]);

  return (
    <CursorContext.Provider value={{ setCursor, clearCursor }}>
      {children}
      {Cursor && (
        <>
          <style>{styles}</style>
          <Cursor
            style={{
              left: `${cursorX}px`,
              top: `${cursorY}px`,
              position: "absolute",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)"
            }}
          />
        </>
      )}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
