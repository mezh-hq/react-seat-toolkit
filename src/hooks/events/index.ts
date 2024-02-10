import useDeselection from "./deselection";
import usePolyline from "./polyline";
import useWorkspaceClick from "./workspace-click";

const useEvents = () => {
  useDeselection();
  usePolyline();
  useWorkspaceClick();
};

export default useEvents;
