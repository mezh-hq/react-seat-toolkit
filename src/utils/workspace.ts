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
  if (typeof window === "undefined") return 0;
  return window.innerWidth / 2 - (workspaceContainer?.offsetLeft ?? 0) - 8;
};

export const getWorkspaceCenterY = () => {
  const workspaceContainer = document.getElementById(ids.workspaceContainer);
  if (typeof window === "undefined") return 0;
  return window.innerHeight / 2 - (workspaceContainer?.offsetTop ?? 0);
};
