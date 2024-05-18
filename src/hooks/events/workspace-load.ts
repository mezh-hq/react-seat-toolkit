import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { panAndZoom } from "@/components/workspace/zoom";
import { dataAttributes, ids, selectors } from "@/constants";
import { store } from "@/store";
import { initializeElements, initializeWorkspace, resetWorkspace, sync } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { d3Extended, getScaleFactorAccountingForViewBoxWidth } from "@/utils";

const useWorkspaceLoad = (props: ISTKProps) => {
  const dataSynced = useSelector((state: any) => state.editor.dataSynced);

  useLayoutEffect(() => {
    if (props.data) {
      store.dispatch(sync(props.data));
    } else {
      store.dispatch(initializeElements());
    }
    props.events?.onWorkspaceLoad?.();
  }, [props.data]);

  useEffect(() => {
    if (dataSynced) {
      const {
        height: workspaceheight,
        width: workspaceWidth,
        top: workspaceTop,
        left: workspaceLeft
      } = d3Extended.selectionBounds(d3Extended.selectById(ids.workspace));
      const workspaceGroup = d3Extended.select(selectors.workspaceGroup);
      const {
        left: wgOffsetLeft,
        top: wgOffsetTop,
        height: workspaceGroupHeight,
        width: workspaceGroupWidth
      } = d3Extended.selectionBounds(workspaceGroup);
      let scaleFactor = 1;
      if (props.data?.workspace?.initialViewBoxScale) {
        workspaceGroup.attr(
          dataAttributes.initialViewBoxScaleForWidth,
          props.data?.workspace.initialViewBoxScaleForWidth
        );
        scaleFactor = getScaleFactorAccountingForViewBoxWidth(
          props.data?.workspace?.initialViewBoxScale,
          props.data?.workspace?.initialViewBoxScaleForWidth
        );
      }
      if (props.data?.workspace?.visibilityOffset) {
        workspaceGroup.attr(dataAttributes.visibilityOffset, props.data?.workspace.visibilityOffset);
      }
      scaleFactor *= 1.05;
      panAndZoom({
        k: scaleFactor,
        y: (workspaceheight + workspaceTop - (wgOffsetTop * scaleFactor * 2 + workspaceGroupHeight * scaleFactor)) / 2,
        x: (workspaceWidth + workspaceLeft - (wgOffsetLeft * scaleFactor * 2 + workspaceGroupWidth * scaleFactor)) / 2
      });
      store.dispatch(initializeWorkspace());
    }
  }, [dataSynced]);

  useEffect(() => {
    return () => {
      store.dispatch(resetWorkspace());
    };
  }, []);
};

export default useWorkspaceLoad;
