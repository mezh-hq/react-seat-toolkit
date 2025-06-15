import { useEffect, useState } from "react";
import { isMobileSafari, isSafari } from "react-device-detect";

/** Constructs dynamic svg rotation attributes to overcome partial CSS support in Safari */
export const useRotation = (ref: React.RefObject<any>, rotation?: number) => {
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      const bbox = ref.current.getBBox();
      setCenter({
        x: bbox.x + (isMobileSafari ? bbox.width / 2 : 0),
        y: bbox.y + bbox.height / 2
      });
    }
  }, [ref]);

  return {
    svgAttr: {
      transform: isSafari ? `rotate(${rotation ?? 0}, ${center.x}, ${center.y})` : undefined
    },
    cssAttr: {
      transform: !isSafari ? `rotate(${rotation ?? 0}deg)` : undefined,
      transformOrigin: "center"
    }
  };
};

export default useRotation;
