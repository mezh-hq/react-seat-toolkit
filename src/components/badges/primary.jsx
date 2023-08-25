import { twMerge } from "tailwind-merge";

const Badge = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        "badge px-4 py-1.5 md:py-2 rounded-full border-2 text-[11px] md:text-xs font-bold text-black border-black uppercase opacity-60 text-center transition-all duration-medium",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
