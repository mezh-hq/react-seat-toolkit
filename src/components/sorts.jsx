import { useEffect, useState } from "react";
import { ArrowDown01, ArrowDown10, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { startCase } from "lodash";
import { twMerge } from "tailwind-merge";
import { computeSortQuery } from "@/utils";
import { useBreakpoint } from "@/hooks";

const Sorts = ({ sorts, setSortQuery, styles = {} }) => {
  const [sortLocalState, setSortLocalState] = useState(sorts);

  useEffect(() => {
    setSortQuery(computeSortQuery(sortLocalState));
  }, [sortLocalState]);

  const onSortChange = (key, direction) => {
    setSortLocalState(
      sortLocalState.map((sort) => {
        if (sort.key === key) {
          sort.direction = direction;
        }
        return sort;
      })
    );
  };

  return (
    <div className={twMerge("w-full flex justify-start items-center gap-6 mt-3 mb-2", styles.root)}>
      {sortLocalState.map((sort, index) => (
        <Sort
          key={`sort-${sort.key}-${index}`}
          sort={sort}
          onSortChange={onSortChange}
          className={twMerge("w-1/2 md:w-1/4", styles.sort)}
        />
      ))}
    </div>
  );
};

const Sort = ({ sort, onSortChange, className }) => {
  const [directionLocalState, setDirectionLocalState] = useState(sort.direction);

  useEffect(() => {
    onSortChange(sort.key, directionLocalState);
  }, [directionLocalState]);

  const { md } = useBreakpoint();

  const setSortOrder = () => {
    if (directionLocalState === 0) {
      setDirectionLocalState(-1);
    } else if (directionLocalState === -1) {
      setDirectionLocalState(1);
    } else {
      setDirectionLocalState(0);
    }
  };

  return (
    <div
      className={twMerge("w-full h-full flex justify-start items-center cursor-pointer group", className)}
      onClick={setSortOrder}
    >
      <div
        className={twMerge(
          "text-2xl mr-2 transition-all duration-medium p-1 rounded-sm text-black/60 group-hover:text-black/90",
          directionLocalState === 0 ? "bg-white" : "bg-black/10"
        )}
      >
        <motion.div
          key={`${sort.key}-${directionLocalState}`}
          initial={{ opacity: 0, translateY: -5 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 5, transition: { duration: 0.3 } }}
          transition={{ duration: 0.3 }}
        >
          {directionLocalState === 0 ? (
            <ArrowUpDown size={16} />
          ) : directionLocalState === 1 ? (
            <ArrowDown01 size={16} />
          ) : (
            <ArrowDown10 size={16} />
          )}
        </motion.div>
      </div>
      <span className="text-md text-black/70 group-hover:text-black/90 font-semibold transition-all duration-150">
        {md ? sort.label : startCase(sort.label.replace("Sort by", ""))}
      </span>
    </div>
  );
};

export default Sorts;
