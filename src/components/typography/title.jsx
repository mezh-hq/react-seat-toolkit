import { twMerge } from "tailwind-merge";

const Title = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge("text-[30px] lg:text-[32px] text-center font-bold lg:text-start tracking-[-2px]", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Title;
