import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Dropdown, Input } from "@/components";
import { computeFilterQuery } from "@/utils";

const Filters = ({ filters, setFilterQuery, styles = {} }) => {
  const [filtersLocalState, setFiltersLocalState] = useState(filters);

  useEffect(() => {
    setFilterQuery(computeFilterQuery(filters));
  }, [filtersLocalState]);

  const onFilterChange = (e) => {
    setFiltersLocalState(
      filtersLocalState.map((filter) => {
        if (filter.key === e.target.name) filter.value = e.target.value;
        return filter;
      })
    );
  };

  return (
    <div className={twMerge("w-full flex flex-col md:flex-row justify-start items-center gap-6", styles.root)}>
      {filtersLocalState.map((filter, index) => {
        return (
          <div
            key={`filter-${filter.key}-${index}`}
            className={twMerge("w-full md:w-1/2 h-full flex flex-col justify-center items-start", styles.filter)}
          >
            {filter.options ? (
              <Dropdown
                variant="secondary"
                label={filter.label}
                filterkey={filter.key}
                options={filter.options}
                className={twMerge("h-12 sm:h-14 font-medium text-black/70", styles.input)}
                onChange={onFilterChange}
              />
            ) : (
              <Input
                variant="secondary"
                className={twMerge("h-12 sm:h-14 font-medium", styles.input)}
                value={filter.value}
                placeholder={`Search by ${filter.label?.toLowerCase()}`}
                name={filter.key}
                onChange={(e) => {
                  onFilterChange(e);
                }}
                prefixIcon={<SearchIcon size={20} className="text-black/50" />}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
