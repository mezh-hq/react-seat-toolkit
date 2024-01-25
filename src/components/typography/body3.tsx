import { twMerge } from "tailwind-merge";

const Body3 = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <h2 className={twMerge("text-[18px] lg:text-[22px] text-start", className)} {...props}>
      {children}
    </h2>
  );
};

export default Body3;
