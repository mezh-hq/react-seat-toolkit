import { SeatStatus } from "@/types/elements";

export const ids = {
  controls: "stk-controls",
  crosshairs: "stk-crosshairs",
  cursor: "stk-cursor",
  location: "stk-location",
  operationBar: "stk-operation-bar",
  operationTrigger: "stk-operation-trigger",
  sectionBar: "stk-section-bar",
  templine: "stk-templine",
  toolbar: "stk-tool-bar",
  workspace: "stk-workspace",
  workspaceContainer: "stk-workspace-container",
  workspaceSelection: "stk-workspace-selection",
  zoomControls: "stk-zoom-controls",
  panControls: "stk-pan-controls",
  visibilityControls: "stk-visibility-controls",
  reloader: "stk-reloader"
};

export const selectors = {
  crosshairGroup: `#${ids.crosshairs} g`,
  workspaceGroup: `#${ids.workspace} g`
};

export const dataAttributes = {
  element: "data-stk-element",
  elementType: "data-element-type",
  shape: "data-shape",
  category: "data-category",
  status: "data-status",
  section: "data-section",
  sectionFreeSeating: "data-section-free-seating",
  visibilityOffset: "data-seat-visibility-offset",
  initialViewBoxScaleForWidth: "data-initial-view-box-scale-for-width",
  embraceOffset: "data-embrace-offset",
  objectLock: "data-object-lock"
};

export const seatStatusColors = {
  [SeatStatus.Available]: {
    background: "#ffffff",
    label: "#000000"
  },
  [SeatStatus.Unavailable]: {
    background: "#e0e0e0",
    label: "#000000"
  },
  [SeatStatus.Reserved]: {
    background: "#ff0000",
    label: "#ffffff"
  },
  [SeatStatus.Locked]: {
    background: "#000000",
    label: "#ffffff"
  }
};
