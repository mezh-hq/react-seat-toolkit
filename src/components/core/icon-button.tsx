import { twMerge } from "tailwind-merge";
import { default as Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ label, icon, className, ...props }) => {
  const button = (
    <Button
      className={twMerge("px-2", props.disabled && "opacity-80 pointer-events-none", className)}
      disabled={props.disabled}
      {...props}
    >
      {icon}
    </Button>
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
