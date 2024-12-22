import { ElementType } from "@/components/workspace/elements";
import { dataAttributes, ids } from "@/constants";
import { d3Extended } from "@/utils";
import { default as useSkipFirstRender } from "./skip-first-render";

export const useVirtualization = (virtualize?: boolean) => {
  useSkipFirstRender(() => {
    if (virtualize) {
      requestIdleCallback(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            requestIdleCallback(() => {
              entries.forEach((entry) => {
                const element = d3Extended.selectById(`${entry.target.id}-label`);
                if (element.style("display") === "block") {
                  element?.classed("!hidden", !entry.isIntersecting);
                }
              });
            });
          },
          {
            root: document.getElementById(ids.workspace),
            rootMargin: "20px"
          }
        );
        document
          .querySelectorAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`)
          .forEach((element) => observer.observe(element));
      });
    }
  }, [virtualize]);
};

export default useVirtualization;
