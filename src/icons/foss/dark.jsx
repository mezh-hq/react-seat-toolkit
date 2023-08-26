import { twMerge } from "tailwind-merge";
import logo from "../../assets/images/logos/foss-dark.png";

const FossDark = ({ className, ...props }) => {
  return <img src={logo} alt="FOSS Logo" className={twMerge("w-[82px] h-[46x]", className)} {...props} />;
};

export default FossDark;
