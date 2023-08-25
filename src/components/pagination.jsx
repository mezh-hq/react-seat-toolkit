import { Pagination as FlowbitePagination } from "flowbite-react";

const Pagination = (props) => {
  return (
    <FlowbitePagination
      {...props}
      nextLabel=""
      previousLabel=""
      totalPages={props.totalPages ?? 1}
      showIcons={true}
      onPageChange={(newPage) => {
        props.onPageChange(newPage);
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }, 0);
      }}
      theme={{
        pages: {
          base: "xs:mt-0 mt-2 inline-flex items-center gap-3.5 font-semibold",
          previous: {
            base: "w-11 h-11 [&>svg]:h-6 [&>svg]:w-6 rounded-full flex justify-center disabled:opacity-40 items-center enabled:hover:bg-black/5 transition-all duration-medium"
          },
          next: {
            base: "w-11 h-11 [&>svg]:h-6 [&>svg]:w-6 rounded-full flex justify-center disabled:opacity-40 items-center enabled:hover:bg-black/5 transition-all duration-medium"
          },
          selector: {
            base: "w-11 h-11  rounded-full bg-white text-black enabled:hover:bg-black/[0.05] transition-all duration-medium",
            active: "pointer-events-none bg-black text-white"
          }
        }
      }}
    />
  );
};

export default Pagination;
