import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

const gap = 50;

export default () => [
  ...[...Array(10).keys()].map((p) => ({
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.4
  })),
  ...[...Array(10).keys()].map((p) => ({
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.4
  })),
  ...[...Array(7).keys()].map((p) => ({
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.5
  })),
  ...[...Array(7).keys()].map((p) => ({
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.5
  })),
  ...[...Array(5).keys()].map((p) => ({
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.6
  })),
  ...[...Array(5).keys()].map((p) => ({
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.6
  }))
];
