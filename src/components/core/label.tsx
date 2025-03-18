import * as React from "react";
import { twMerge } from "tailwind-merge";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={twMerge(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed select-none peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
);

Label.displayName = "Label";

export { Label };
