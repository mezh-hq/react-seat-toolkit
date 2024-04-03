import { store } from "@/store";
import { deselectElement } from "@/store/reducers/editor";

export const mutations = {
  deselectElement: (elementId: string) => store.dispatch(deselectElement(elementId))
};

export default mutations;
