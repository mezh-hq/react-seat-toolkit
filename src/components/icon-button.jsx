import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
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

const IconButton = ({ variant = "primary", label, icon, className, ...props }) => {
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
      {icon}
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
