import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "group flex justify-center items-center cursor-pointer rounded-md px-[1.15rem] py-[0.4rem] font-semibold outline-none transition-all duration-medium gap-2 splash",
  {
    variants: {
      variant: {
        primary: "bg-black text-white",
        secondary: "text-black bg-white border border-black/20 after:bg-black/[0.15]"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

const Core = ({ variant = "primary", children, loading, className, ...props }) => {
  return (
    <button
      className={twMerge(
        buttonVariants({ variant }),
        className,
        loading || props.disabled ? "opacity-80 pointer-events-none" : ""
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading !== undefined && (
        <div
          className={`${
            loading ? "opacity-100 ml-0" : "opacity-0 pointer-events-none -mr-7"
          } transition-all duration-150`}
        >
          <RotatingLines width="20" strokeColor="white" ariaLabel="button-loading" visible={true} />
        </div>
      )}
      {children}
    </button>
  );
};

const Button = ({ to, wrapperClassName, target, ariaLabel, ...props }) => {
  if (to) {
    return (
      <Link to={to} target={target ?? "_self"} className={wrapperClassName} aria-label={ariaLabel}>
        <Button {...props} />
      </Link>
    );
  }
  return <Core {...props} />;
};

export default Button;
