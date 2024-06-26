import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface AnimatedSwitcherProps {
  component: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

const AnimatedSwitcher = ({ component, className, style, duration = 0.3 }: AnimatedSwitcherProps) => {
  const [opacity, setOpacity] = useState(0);
  const [currentComponent, setCurrentComponent] = useState(component);

  useEffect(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentComponent(component);
      setOpacity(1);
    }, (duration / 2) * 1000);
  }, []);

  return (
    <div
      className={twMerge("w-full h-full", className)}
      style={{ ...style, transitionDuration: `${duration / 2}s`, opacity }}
    >
      {currentComponent}
    </div>
  );
};

export default AnimatedSwitcher;
