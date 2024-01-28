import { useCallback, useEffect } from "react";
import { Cog } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { locationPlaceholder, setLocation } from "@/store/reducers/editor";
import { Body, Button } from "./core";

const Navbar = () => {
  const location = useSelector((state) => state.editor.location);

  const onEscape = useCallback((event) => {
    if (event.key === "Escape") {
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  const onLocationChange = (e) => {
    const location = e.target.innerText;
    if (!location) {
      document.getElementById("stk-location-name").innerText = locationPlaceholder;
      return store.dispatch(setLocation(locationPlaceholder));
    }
    store.dispatch(setLocation(location));
  };

  return (
    <div className="w-full flex justify-between items-center gap-6 bg-black/5 pl-5 md:pl-[3.25rem] pr-5 p-3">
      <Body
        id="stk-location-name"
        contentEditable="true"
        suppressContentEditableWarning={true}
        className={twMerge("text-xl font-bold outline-none", location === locationPlaceholder && "opacity-60")}
        onInput={onLocationChange}
      >
        {locationPlaceholder}
      </Body>
      <div className="flex justify-between items-center gap-5">
        <Button>Export JSON</Button>
        <Cog size={30} className="cursor-pointer transform hover:rotate-90 transition-all duration-300" />
      </div>
    </div>
  );
};

export default Navbar;
