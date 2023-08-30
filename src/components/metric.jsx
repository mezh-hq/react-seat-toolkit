import { twMerge } from "tailwind-merge";
import { default as AnimatedSwitcher } from "./animated-switcher";
import { default as Skeleton } from "./skeleton";

const Metric = ({ styles, metric, value, ...props }) => {
  return (
    <div className={twMerge("w-full sm:w-auto flex gap-[3px] items-center", styles?.root)} {...props}>
      <div
        className={twMerge("w-full sm:w-auto px-3 py-2 bg-white font-medium text-black/40 rounded-l", styles?.metric)}
      >
        {metric}
      </div>
      <AnimatedSwitcher
        show={!!value}
        className={twMerge("w-auto h-auto", styles?.animate)}
        component={
          <div
            className={twMerge(
              "p-2 min-w-[40px] min-h-[40px] flex justify-center items-center bg-white font-semibold rounded-r",
              styles?.value
            )}
          >
            {value}
          </div>
        }
        alternateComponent={
          <Skeleton
            containerClassName="flex"
            className="p-2 min-w-[40px] min-h-[40px] rounded-none rounded-r"
            shade="dark"
            single
          />
        }
      />
    </div>
  );
};

export default Metric;
