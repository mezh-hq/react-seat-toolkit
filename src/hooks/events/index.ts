import { ISTKProps } from "@/types";
import { default as useDeselection } from "./deselection";
import { default as useDuplicate } from "./duplication";
import { default as usePolyline } from "./polyline";
import { default as useSeatSelectionChange } from "./seat-selection";
import { default as useWorkspaceClick } from "./workspace-click";
import { default as useWorkspaceLoad } from "./workspace-load";

export const useDesignerEvents = (props: ISTKProps) => {
  useDeselection();
  useDuplicate();
  usePolyline();
  useWorkspaceClick();
  useWorkspaceLoad(props);
};

export const useUserEvents = (props: ISTKProps) => {
  useWorkspaceLoad(props);
  useSeatSelectionChange(props);
};
