import { ids } from "@/constants";

export const getWorkspaceWidth = () => {
  const workspace = document.getElementById(ids.workspaceContainer);
  return workspace ? workspace.clientWidth : 0;
};

export const getWorkspaceHeight = () => {
  const workspace = document.getElementById(ids.workspaceContainer);
  return workspace ? workspace.clientHeight : 0;
};

export const getWorkspaceCenterX = () => {
  const workspaceContainer = document.getElementById(ids.workspaceContainer);
  return window.innerWidth / 2 - workspaceContainer.offsetLeft;
};

export const getWorkspaceCenterY = () => {
  const workspaceContainer = document.getElementById(ids.workspaceContainer);
  return window.innerHeight / 2 - workspaceContainer.offsetTop;
};
