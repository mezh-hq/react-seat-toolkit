import { panDown, panLeft, panRight, panUp } from "@/components/workspace/zoom";
import { store } from "@/store";
import { deselectElement } from "@/store/reducers/editor";

export const actions = {
  deselectElement: (elementId: string) => store.dispatch(deselectElement(elementId)),
  panLeft,
  panDown,
  panRight,
  panUp
};

export default actions;
