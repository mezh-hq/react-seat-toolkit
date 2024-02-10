import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ids } from "@/constants";
import { store } from "@/store";
import { getRelativeClickCoordsWithTransform } from "@/utils";

const usePolyline = () => {
  const selectedPolylineId = useSelector((state: any) => state.editor.selectedPolylineId);
  const polylines = useSelector((state: any) => state.editor.polylines);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (selectedPolylineId) {
        const templine = document.getElementById(ids.templine);
        const selectedPolyline = store
          .getState()
          .editor.polylines.find((polyline) => polyline.id === selectedPolylineId);
        const lastPoint = selectedPolyline.points[selectedPolyline.points.length - 1];
        const coords = getRelativeClickCoordsWithTransform(e);
        templine.setAttribute("x1", lastPoint.x);
        templine.setAttribute("y1", lastPoint.y);
        templine.setAttribute("x2", String(coords.x));
        templine.setAttribute("y2", String(coords.y));
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [selectedPolylineId, polylines]);
};

export default usePolyline;
