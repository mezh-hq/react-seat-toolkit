import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components";
import { ids } from "@/constants";
import { store } from "@/store";
import { addSection, deleteSection, selectSection, updateSection } from "@/store/reducers/editor";

const onSectionChange = (e) => {
  const section = e.target.innerText || `Section ${+e.target.getAttribute("data-section-index") + 1}`;
  store.dispatch(
    updateSection({
      id: e.target.id,
      name: section
    })
  );
};

const onAddSection = () => {
  store.dispatch(addSection());
};

const onSectionClick = (e) => {
  store.dispatch(selectSection(e.target.id));
};

const onSectionContextMenu = (e) => {
  e.preventDefault();
};

const Sections = () => {
  const [contextMenuForId, setContextMenuForId] = useState(null);

  const sections = useSelector((state) => state.editor.sections);
  const selectedSection = useSelector((state) => state.editor.selectedSection);

  const onSectionMouseDown = useCallback(
    (e) => {
      if (e.which === 3 || e.button === 2) {
        if (sections.length > 1) setContextMenuForId(e.target.id);
      }
    },
    [sections.length]
  );

  const onSectionDelete = useCallback((id) => {
    store.dispatch(deleteSection(id));
    setContextMenuForId(null);
  }, []);

  useEffect(() => {
    const closeContextMenu = (e) => {
      if (e.target.id !== contextMenuForId && !e.target.parentNode.hasAttribute("data-radix-popper-content-wrapper"))
        setContextMenuForId(null);
    };
    document.addEventListener("click", closeContextMenu);
    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, [contextMenuForId]);

  return (
    <div
      id={ids.sectionBar}
      className="w-full flex justify-start items-center bg-black/10 border-t border-black overflow-x-scroll"
    >
      <div
        className="p-2 bg-white w-[3.297rem] h-full hover:bg-gray-100 cursor-pointer flex justify-center items-center border-r border-black transition-all duration-medium"
        onClick={onAddSection}
      >
        <Plus size={20} />
      </div>
      {sections.map((section, index) => (
        <Popover key={index} open={contextMenuForId === section.id}>
          <PopoverTrigger
            contentEditable
            suppressContentEditableWarning={true}
            id={section.id}
            data-section-index={index}
            className={twMerge(
              "p-2 px-4 bg-white hover:bg-gray-100 cursor-pointer flex justify-center items-center outline-none border-r border-black transition-all duration-medium",
              selectedSection === section.id && "bg-gray-100"
            )}
            onBlur={onSectionChange}
            onClick={onSectionClick}
            onMouseDown={onSectionMouseDown}
            onContextMenu={onSectionContextMenu}
          >
            {section.name}
          </PopoverTrigger>
          <PopoverContent
            className="bg-white w-36 cursor-pointer hover:bg-gray-100 transition-all duration-medium"
            onClick={() => onSectionDelete(section.id)}
          >
            Delete Section
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default Sections;
