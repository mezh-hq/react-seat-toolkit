import { LazyMotion, domAnimation, m as motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface AnimatedSwitcherProps {
  customKey?: string;
  component: React.ReactNode;
  alternateComponent?: React.ReactNode;
  show: boolean;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

const AnimatedSwitcher = ({
  customKey,
  component,
  alternateComponent,
  show,
  className,
  style,
  duration
}: AnimatedSwitcherProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        key={customKey ?? (show ? "component" : "alternateComponent")}
        className={twMerge("w-full h-full", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration ?? 0.3 }}
        style={style}
        exit={{ opacity: 0 }}
      >
        {show ? component : alternateComponent}
      </motion.div>
    </LazyMotion>
  );
};

export default AnimatedSwitcher;
