import { twMerge } from "tailwind-merge";
import logo from "@/assets/images/logos/foss-light.png";

const FossLight = ({ className, ...props }) => {
  return <img src={logo} alt="FOSS Logo" className={twMerge("w-[74px] h-[42px]", className)} {...props} />;
};

export default FossLight;
