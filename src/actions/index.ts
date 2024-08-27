import { panDown, panLeft, panRight, panUp } from "@/components/workspace/dock";
import { store } from "@/store";
import { clearElements, deselectElement, selectElement } from "@/store/reducers/editor";
import { stateToJSON } from "@/utils";

const actions = {
  selectElement: (elementId: string) => store.dispatch(selectElement(elementId)),
  deselectElement: (elementId: string) => store.dispatch(deselectElement(elementId)),
  deselectAllElements: () => store.dispatch(clearElements(false)),
  getState: stateToJSON,
  panLeft,
  panDown,
  panRight,
  panUp
};

export { store, actions };

export default actions;
