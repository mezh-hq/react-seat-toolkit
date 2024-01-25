import { twMerge } from "tailwind-merge";

const Body = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={twMerge("text-[25px] sm:text-[28px] text-center lg:text-start font-consolas", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Body;
