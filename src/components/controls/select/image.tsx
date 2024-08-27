import { useState } from "react";
import { useSelector } from "react-redux";
import { Label, Switch } from "@/components/core";
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
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center gap-2">
        <Label htmlFor="stk-lock-position">Object Lock</Label>
        <Switch id="stk-lock-position" checked={locked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
};

export default ImageSelectControls;
