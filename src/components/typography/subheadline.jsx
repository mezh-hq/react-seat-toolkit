import { twMerge } from "tailwind-merge";

const Subheadline = ({ children, className, ...props }) => {
  return (
    <h2 className={twMerge("text-[18px] lg:text-[22px] text-start font-bold", className)} {...props}>
      {children}
    </h2>
  );
};

export default Subheadline;
