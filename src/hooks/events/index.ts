import { ISTKProps } from "@/types";
import { default as useDelete } from "./deletion";
import { default as useDeselection } from "./deselection";
import { default as useDuplicate } from "./duplication";
import { default as useMove } from "./move";
import { default as usePolyline } from "./polyline";
import { default as useSeatSelectionChange } from "./seat-selection";
import { useSelectAll, useSelection } from "./selection";
import { default as useWorkspaceClick } from "./workspace-click";
import { default as useWorkspaceLoad } from "./workspace-load";

export const useDesignerEvents = (props: ISTKProps) => {
  useDelete();
  useDeselection();
  useDuplicate();
  useMove();
  usePolyline();
  useSelection();
  useSelectAll();
  useWorkspaceClick();
  useWorkspaceLoad(props);
};

export const useUserEvents = (props: ISTKProps) => {
  useWorkspaceLoad(props);
  useSeatSelectionChange(props);
};
