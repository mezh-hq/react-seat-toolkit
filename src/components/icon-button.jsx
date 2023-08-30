import { RotatingLines } from "react-loader-spinner";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { default as AnimatedSwitcher } from "./animated-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const buttonVariants = cva("rounded-full splash p-2 transition-all duration-medium", {
  variants: {
    variant: {
      primary: "bg-black text-white border border-transparent",
      secondary: "text-black bg-white border"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

const IconButton = ({ variant = "primary", label, icon, loading, loaderProps, className, ...props }) => {
  const button = (
    <button
      className={twMerge(
        buttonVariants({ variant }),
        className,
        props.disabled ? "opacity-80 pointer-events-none" : ""
      )}
      disabled={props.disabled}
      {...props}
    >
      <AnimatedSwitcher
        show={loading}
        component={
          <RotatingLines
            height="20"
            width="20"
            color="#fff"
            strokeColor={variant === "primary" ? "white" : "black"}
            ariaLabel="button-loading"
            visible={true}
            {...loaderProps}
          />
        }
        alternateComponent={icon}
      />
    </button>
  );

  if (!label) return button;

  return (
    <Tooltip>
      <TooltipTrigger>{button}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default IconButton;
