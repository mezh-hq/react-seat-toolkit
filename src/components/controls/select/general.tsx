import { useSelector } from "react-redux";
import { Button } from "@/components/core";
import { d3Extended } from "@/utils";

const GeneralSelectControls = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="py-[0.35rem]"
        variant="secondary"
        onClick={() => {
          selectedElementIds.forEach((id) => {
            d3Extended.selectById(id).moveToFront();
          });
        }}
      >
        Bring to Front
      </Button>
      <Button
        className="py-[0.35rem]"
        variant="secondary"
        onClick={() => {
          selectedElementIds.forEach((id) => {
            d3Extended.selectById(id).moveToBack();
          });
        }}
      >
        Send to Back
      </Button>
    </div>
  );
};

export default GeneralSelectControls;
