import { twMerge } from "tailwind-merge";

export const NoRecords = ({ text = "No Records Found", ...props }) => {
  return (
    <div className={twMerge(`w-full h-full flex justify-center items-center`, props.className)}>
      <span className="text-2xl font-semibold">{text}</span>
    </div>
  );
};

export default NoRecords;
