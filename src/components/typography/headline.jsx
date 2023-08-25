import { twMerge } from "tailwind-merge";

const Headline = ({ children, className, ...props }) => {
  return (
    <h1 className={twMerge("text-[25px] lg:text-[30px] text-start", className)} {...props}>
      {children}
    </h1>
  );
};

export default Headline;
