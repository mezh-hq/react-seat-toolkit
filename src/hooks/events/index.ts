import useDeselection from "./deselection";
import useDuplicate from "./duplicate";
import usePolyline from "./polyline";
import useWorkspaceClick from "./workspace-click";

const useEvents = () => {
  useDeselection();
  usePolyline();
  useWorkspaceClick();
  useDuplicate();
};

export default useEvents;
