import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { ArrowPair } from "@/icons";
import { inputStyles } from "./input";

const wrapperId = uuidv4();
const inputId = uuidv4();

const dropdownVariants = cva(inputStyles, {
  variants: {
    variant: {
      primary: "rounded-md",
      secondary: "rounded-full"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

const prefixIconStyles = "text-black/50 cursor-pointer transition-all duration-150 absolute right-0";

const Dropdown = ({ variant = "primary", className, label, options, onChange, ...props }) => {
  const [selectedOption, setSelectedOption] = useState(props.default || null);

  const [showItems, setShowItems] = useState(false);

  const id = props.id || inputId;

  const clickListener = (e) => {
    if (e.target.id !== id && e.target.id !== wrapperId) {
      setShowItems(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  });

  const onSelect = (option) => {
    onChange({
      target: {
        name: props.filterkey,
        value: option?.key
      }
    });
    setSelectedOption(option?.key);
  };

  return (
    <div id={wrapperId} className={twMerge(`w-full relative`, props.wrapperclasses)}>
      <input
        id={id}
        className={twMerge(dropdownVariants({ variant }), "cursor-pointer hide-blink", className)}
        value={options.find((opt) => opt.key === selectedOption)?.label || label || "Select"}
        onClick={() => setShowItems(!showItems)}
        onChange={() => {}}
      />
      {showItems && (
        <div
          className="absolute w-full left-0 z-10 mt-2 origin-top-right rounded-2xl bg-white/50 backdrop-blur-lg border border-black/20 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          {options.map((option, index) => {
            return (
              <div
                key={`${option.key}-${index}`}
                className={twMerge(
                  "text-gray-700 block px-5 py-3  cursor-pointer hover:bg-black/5 hover:text-gray-900 transition-all duration-medium",
                  index === 0 ? "rounded-t-2xl" : "",
                  index === options.length - 1 ? "rounded-b-2xl" : ""
                )}
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={() => onSelect(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
      <div
        className={twMerge(
          `w-fit h-full absolute right-5 top-0 flex justify-center items-center`,
          className?.includes("hidden") || className?.includes("opacity-0") ? "hidden opacity-0" : ""
        )}
      >
        <XIcon
          size={20}
          className={twMerge(prefixIconStyles, selectedOption ? "opacity-100" : "opacity-0 pointer-events-none")}
          onClick={onSelect}
        />
        <ArrowPair
          size={20}
          className={twMerge("pointer-events-none", prefixIconStyles, !selectedOption ? "opacity-100" : "opacity-0")}
        />
      </div>
    </div>
  );
};

export default Dropdown;
