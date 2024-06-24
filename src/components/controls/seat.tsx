import { ISTKProps } from "@/types";
import { CategoryManager } from "../controls/select/seats/categorizer";

type IControlProps = Pick<ISTKProps, "options" | "styles">;

const SeatControls = (props: IControlProps) => {
  return (
    <div className="flex flex-col gap-4">
      <CategoryManager {...props} />
    </div>
  );
};

export default SeatControls;
