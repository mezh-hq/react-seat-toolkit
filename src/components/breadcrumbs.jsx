import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { default as Badge } from "./badges";

const Breadcrumbs = ({ breadcrumbs, className, ...props }) => {
  return (
    <div {...props} className={twMerge("w-full flex flex-wrap items-center gap-2.5 gap-y-4 cursor-default", className)}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={index}>
          <Link to={breadcrumb.path ?? "/"} className={index === breadcrumbs.length - 1 ? "pointer-events-none" : ""}>
            <Badge
              key={index}
              className={`opacity-100 border-black/10 text-black font-medium ${
                index === breadcrumbs.length - 1 ? "opacity-50" : ""
              }`}
            >
              {breadcrumb.label ?? breadcrumb}
            </Badge>
          </Link>
          {index !== breadcrumbs.length - 1 && <ChevronRight className="w-6 h-6" />}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
