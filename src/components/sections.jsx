import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components";
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

const onAddSection = () => store.dispatch(addSection());

const onDeleteSection = (id) => store.dispatch(deleteSection(id));

const onSectionClick = (e) => store.dispatch(selectSection(e.target.id));

const Sections = () => {
  const sections = useSelector((state) => state.editor.sections);
  const selectedSection = useSelector((state) => state.editor.selectedSection);

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
        <ContextMenu key={section.id}>
          <ContextMenuTrigger
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
            disabled={sections.length === 1}
          >
            {section.name}
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-white p-0">
            <ContextMenuItem
              className="cursor-pointer py-2 pl-4 hover:bg-gray-100 transition-all duration-medium"
              onClick={() => onDeleteSection(section.id)}
            >
              Delete Section
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
};

export default Sections;
