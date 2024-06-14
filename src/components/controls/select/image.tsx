import { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/core";
import { dataAttributes } from "@/constants";

const ImageSelectControls = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  const firstElement = document.getElementById(selectedElementIds[0]);

  const [locked, setLocked] = useState(firstElement.getAttribute(dataAttributes.objectLock) === "true");

  const onCheckedChange = (checked: boolean) => {
    selectedElementIds.forEach((id: string) => {
      document.getElementById(id).setAttribute(dataAttributes.objectLock, checked.toString());
    });
    setLocked(checked);
  };

  return (
    <div className="flex justify-end gap-4 py-1">
      <Checkbox id="stk-lock-position" checked={locked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor="stk-lock-position"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Object Lock
      </label>
    </div>
  );
};

export default ImageSelectControls;
