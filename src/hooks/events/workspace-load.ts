import { useLayoutEffect } from "react";
import { panAndZoom } from "@/components/workspace/zoom";
import { ids, selectors } from "@/constants";
import { store } from "@/store";
import { initializeElements, sync } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { d3Extended } from "@/utils";

const useWorkspaceLoad = (props: ISTKProps) => {
  useLayoutEffect(() => {
    if (props.data) {
      store.dispatch(sync(props.data));
      setTimeout(() => {
        const { height: workspaceheight, width: workspaceWidth } = d3Extended.selectionBounds(
          d3Extended.selectById(ids.workspace)
        );
        const {
          left: wgOffsetLeft,
          top: wgOffsetTop,
          height: workspaceGroupHeight,
          width: workspaceGroupWidth
        } = d3Extended.selectionBounds(d3Extended.select(selectors.workspaceGroup));
        const scaleFactor = 1.05;
        panAndZoom({
          k: scaleFactor,
          y: (workspaceheight - (wgOffsetTop * scaleFactor * 2 + workspaceGroupHeight * scaleFactor)) / 2 - 7,
          x: (workspaceWidth - (wgOffsetLeft * scaleFactor * 2 + workspaceGroupWidth * scaleFactor)) / 2
        });
      }, 0);
    } else {
      store.dispatch(initializeElements());
    }
    props.events?.onWorkspaceLoad?.();
  }, [props.data]);
};

export default useWorkspaceLoad;
