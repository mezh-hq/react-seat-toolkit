import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface AnimatedSwitcherProps {
  customKey?: string;
  component: React.ReactNode;
  alternateComponent?: React.ReactNode;
  show: boolean;
  className?: string;
  duration?: number;
}

const AnimatedSwitcher = ({
  customKey,
  component,
  alternateComponent,
  show,
  className,
  duration
}: AnimatedSwitcherProps) => {
  return (
    <motion.div
      key={customKey ?? (show ? "component" : "alternateComponent")}
      className={twMerge("w-full h-full", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration ?? 0.3 }}
      exit={{ opacity: 0 }}
    >
      {show ? component : alternateComponent}
    </motion.div>
  );
};

export default AnimatedSwitcher;
