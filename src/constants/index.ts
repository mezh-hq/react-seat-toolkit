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
  zoomControls: "stk-zoom-controls"
};

export const selectors = {
  crosshairGroup: `#${ids.crosshairs} g`,
  workspaceGroup: `#${ids.workspace} g`
};

export const dataAttributes = {
  elementType: "data-element-type",
  shape: "data-shape",
  category: "data-category"
};
