import { ISTKProps } from "@/types";
import { SectionManager } from "./select/polyline/section-selector";

type IControlProps = Pick<ISTKProps, "options" | "styles">;

const PolylineControls = (props: IControlProps) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionManager {...props} />
    </div>
  );
};

export default PolylineControls;
