import { FaChevronRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function Link({ className }) {
  return (
    <div className={twMerge("text-black md:mt-0.5 pl-1.5 animated-chevron", className)}>
      <FaChevronRight className="p-0.5" />
    </div>
  );
}
