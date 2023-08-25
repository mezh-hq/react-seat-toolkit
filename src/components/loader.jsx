import { Triangle } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Loader = () => {
  const { showLoader } = useSelector((state) => state.ui.global);
  return (
    <div
      className={`w-full h-full fixed z-50 top-0 left-0 bg-black/20 backdrop-blur-[5px] flex justify-center items-center transition duration-300 ${
        showLoader ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Triangle
        height="110"
        width="110"
        color="#000000"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
