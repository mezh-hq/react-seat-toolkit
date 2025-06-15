import { useEffect, useState } from "react";
import { isMobileSafari, isSafari } from "@/constants/user-agent";

/** Constructs dynamic svg rotation attributes to overcome partial CSS support in Safari */
export const useRotationAttributes = (ref: React.RefObject<any>, rotation?: number) => {
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
    svg: {
      transform: isSafari ? `rotate(${rotation ?? 0}, ${center.x}, ${center.y})` : undefined
    },
    css: {
      transform: isSafari ? undefined : `rotate(${rotation ?? 0}deg)`,
      transformOrigin: "center"
    }
  };
};

export default useRotationAttributes;
