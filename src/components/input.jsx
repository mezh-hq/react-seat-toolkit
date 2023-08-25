import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const eyeIconClasses = "cursor-pointer text-black/40 hover:text-black/60 transition-all duration-medium";

export const inputStyles = `w-full h-14 sm:h-16 bg-transparent border bg-white border-black/20 focus:border-black outline-none !focus:outline-none !ring-0 !focus:ring-0 p-5 text-base font-normal transition duration-300`;

const inputVariants = cva(inputStyles, {
  variants: {
    variant: {
      primary: "rounded-md text-black",
      secondary: "rounded-full text-black/80"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

const Input = ({ variant = "primary", className, prefixIcon, ...props }) => {
  const [localType, setLocalType] = useState(props.type ?? "text");
  return (
    <div className={twMerge("w-full relative", props.wrapperclasses)}>
      <input
        {...props}
        className={twMerge(inputVariants({ variant }), className, prefixIcon ? "pl-12" : "")}
        type={localType}
      />
      {prefixIcon && (
        <div className="w-fit h-full absolute left-5 top-0 flex justify-center items-center">{prefixIcon}</div>
      )}
      {props.type === "password" && (
        <div
          className={`w-fit h-full absolute right-5 top-0 flex justify-center items-center ${
            className?.includes("hidden") || className?.includes("opacity-0") ? "hidden opacity-0" : ""
          }`}
        >
          {localType === "password" ? (
            <EyeIcon className={eyeIconClasses} onClick={() => setLocalType("text")} strokeWidth="1.5" />
          ) : (
            <EyeOff className={eyeIconClasses} onClick={() => setLocalType("password")} strokeWidth="1.5" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
