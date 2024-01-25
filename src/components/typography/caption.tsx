import { twMerge } from "tailwind-merge";

const Caption = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={twMerge("text-[14px] font-medium text-center lg:text-start", className)} {...props}>
      {children}
    </span>
  );
};

export default Caption;
