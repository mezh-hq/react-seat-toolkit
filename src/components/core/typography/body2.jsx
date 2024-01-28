import { twMerge } from "tailwind-merge";

const Body2 = ({ children, className, ...props }) => {
  return (
    <h2 className={twMerge("text-[18px] lg:text-[22px] text-start", className)} {...props}>
      {children}
    </h2>
  );
};

export default Body2;
