import { twMerge } from "tailwind-merge";

const Body = ({ children, className, ...props }) => {
  return (
    <span className={twMerge("text-[20px] sm:text-[22px] lg:text-[24px] text-start", className)} {...props}>
      {children}
    </span>
  );
};

export default Body;
