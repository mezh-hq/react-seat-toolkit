import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const padding = "px-4 py-2";

const valueStyles = "z-50 pointer-events-none transition-all duration-medium";

const TwinSwitch = ({ values = [], selectedValue, onChange, handleClassName, ...props }) => {
  const [selected, setSelected] = useState(selectedValue ?? values[0]);
  const [handleStyles, setHandleStyles] = useState({});

  const value1Ref = useRef();
  const value2Ref = useRef();

  const toggle = () => {
    const newValue = values.find((value) => value !== selected);
    setSelected(newValue);
    setHandleStyles({
      transform: `translateX(${newValue === values[0] ? 0 : value1Ref.current.offsetWidth}px)`,
      width: `${newValue === values[0] ? value1Ref.current.offsetWidth : value2Ref.current.offsetWidth}px`,
      height: value1Ref.current.offsetHeight
    });
    onChange?.(newValue);
  };

  return (
    <div
      {...props}
      onClick={toggle}
      className={twMerge(
        "relative flex border border-red-100 rounded-full font-semibold p-1.5 cursor-pointer",
        props.className
      )}
    >
      <span ref={value1Ref} className={twMerge(padding, valueStyles, selected === values[0] ? "text-white" : "")}>
        {values[0]}
      </span>
      <span ref={value2Ref} className={twMerge(padding, valueStyles, selected === values[1] ? "text-white" : "")}>
        {values[1]}
      </span>
      <div
        className={twMerge(
          padding,
          "group absolute flex justify-center items-center bg-[#f00] rounded-full transition-all duration-medium",
          handleClassName
        )}
        style={handleStyles}
      >
        <span className="opacity-0">{selected}</span>
        <div className="absolute w-full h-full opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#f90000] to-[#FF881A]/[.95] rounded-full transition-all duration-medium" />
      </div>
    </div>
  );
};

export default TwinSwitch;
