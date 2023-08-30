import { twMerge } from "tailwind-merge";

const Metric = ({ styles, metric, value, ...props }) => {
  return (
    <div className={twMerge("flex gap-[3px] items-center", styles?.root)} {...props}>
      <div className={twMerge("px-3 py-2 bg-white font-medium text-black/40 rounded-l", styles?.metric)}>{metric}</div>
      <div className={twMerge("p-2 min-w-[40px] flex justify-center bg-white font-semibold rounded-r", styles?.value)}>
        {value}
      </div>
    </div>
  );
};

export default Metric;
