import { default as SkeletonLoader } from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import 'react-loading-skeleton/dist/skeleton.css'

const shadeMap = {
  dark: {
    baseColor: "#cccccc",
    highlightColor: "#e3e3e3"
  }
};

const Skeleton = ({ containerClassName, className, shade = "normal", ...props }) => {
  return (
    <SkeletonLoader
      containerClassName={twMerge("", containerClassName)}
      className={twMerge("h-full w-full rounded-md", className)}
      baseColor={shadeMap[shade]?.baseColor}
      highlightColor={shadeMap[shade]?.highlightColor}
      {...props}
    />
  );
};

export default Skeleton;
