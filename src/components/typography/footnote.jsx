import { twMerge } from "tailwind-merge";

const Footnote = ({ children, className, ...props }) => {
  return (
    <span className={twMerge("text-[15px] lg:text-[16px] text-center lg:text-start", className)} {...props}>
      {children}
    </span>
  );
};

export default Footnote;
