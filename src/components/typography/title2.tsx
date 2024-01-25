import { twMerge } from "tailwind-merge";

const Title2 = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <h1 className={twMerge("text-[25px] lg:text-[30px] text-start", className)} {...props}>
      {children}
    </h1>
  );
};

export default Title2;
