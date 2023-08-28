import { default as SkeletonLoader } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { twMerge } from "tailwind-merge";

const shadeMap = {
  dark: {
    baseColor: "#ececec",
    highlightColor: "#f0f0f0"
  },
  normal: {
    baseColor: "#f8f8f8",
    highlightColor: "#f2f2f2"
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
