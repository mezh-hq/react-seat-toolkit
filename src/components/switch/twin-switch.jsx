import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const valueStyles = "p-3 z-50 pointer-events-none transition-all duration-medium";

const TwinSwitch = ({ values = [], onChange, handleClassName, ...props }) => {
  const [selected, setSelected] = useState(values[0]);
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
      className="relative flex border border-red-100 rounded-full font-semibold p-2 cursor-pointer"
      onClick={toggle}
      {...props}
    >
      <span ref={value1Ref} className={twMerge(valueStyles, selected === values[0] ? "text-white" : "")}>
        {values[0]}
      </span>
      <span ref={value2Ref} className={twMerge(valueStyles, selected === values[1] ? "text-white" : "")}>
        {values[1]}
      </span>
      <div
        className={twMerge(
          "absolute flex justify-center items-center p-3 bg-[#f00] hover:bg-red-600 rounded-full transition-all duration-medium",
          handleClassName
        )}
        style={handleStyles}
      >
        <span className="opacity-0">{selected}</span>
      </div>
    </div>
  );
};

export default TwinSwitch;
