import { twMerge } from "tailwind-merge";

const Callout = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge("text-[16px] sm:text-[18px] lg:text-[19px] text-center lg:text-start", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Callout;
