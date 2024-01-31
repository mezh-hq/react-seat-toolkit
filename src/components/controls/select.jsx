import { Callout, Caption } from "../core";

const SelectControls = () => {
  return (
    <div className="w-full flex justify-between items-center gap-12">
      <Callout className="font-semibold">Categories</Callout>
      <Caption className="text-blue-500 transform translate-y-0.5">Manage</Caption>
    </div>
  );
};

export default SelectControls;
