import { panDown, panLeft, panRight, panUp } from "@/components/workspace/zoom";
import { store } from "@/store";
import { clearElements, deselectElement } from "@/store/reducers/editor";

export const actions = {
  deselectElement: (elementId: string) => store.dispatch(deselectElement(elementId)),
  deselectAllElements: () => store.dispatch(clearElements(false)),
  panLeft,
  panDown,
  panRight,
  panUp
};

export default actions;
