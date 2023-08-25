import { twMerge } from "tailwind-merge";

const BodyText2 = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge("text-[20px] sm:text-[22px] lg:text-[24px] text-center lg:text-start", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default BodyText2;
