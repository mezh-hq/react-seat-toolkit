import { Percent, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { default as debounce } from "lodash/debounce";
import { twMerge } from "tailwind-merge";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/components/core";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { addSection, deleteSection, updatePolylines, updateSection } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { Callout, Caption, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../core";

const onAddSection = () => store.dispatch(addSection(undefined));

const onDeleteSection = (id: string) => store.dispatch(deleteSection(id));

const onUpdateSection = debounce((section) => store.dispatch(updateSection(section)), 150);

type IControlProps = Pick<ISTKProps, "options" | "styles">;

export const SectionManager = ({ options }: IControlProps) => {
  const sections = useSelector((state: any) => state.editor.sections);
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold leading-none pb-1">Manage Sections</h4>
        <hr />
        <span className="hover:text-gray-500 cursor-pointer transition-all duration-medium" onClick={onAddSection}>
          + Add Section
        </span>
        <hr />
      </div>
      <div className="flex flex-col gap-4">
        {sections.map(
          (section, index) =>
            section.id !== "0" && (
              <div key={`category-${section.id}`} className="flex justify-start items-center gap-4">
                <input
                  defaultValue={section.color}
                  type="color"
                  className="flex-shrink-0 w-6 h-6 p-0 bg-white rounded-color-input"
                  onChange={(e) => onUpdateSection({ ...section, color: e.target.value })}
                />
                <input
                  defaultValue={section.stroke}
                  type="color"
                  className="flex-shrink-0 w-6 h-6 p-0 bg-white rounded-color-input"
                  onChange={(e) => onUpdateSection({ ...section, stroke: e.target.value })}
                />
                <Input
                  defaultValue={section.name}
                  className="h-8"
                  onChange={(e) => onUpdateSection({ ...section, name: e.target.value })}
                />
                <Percent
                  size={22}
                  className={twMerge(
                    "flex-shrink-0 cursor-pointer transition-all duration-medium ",
                    section?.freeSeating ? "text-blue-600 hover:text-blue-500" : "hover:text-gray-500"
                  )}
                  onClick={() =>
                    section?.freeSeating
                      ? onUpdateSection({ ...section, freeSeating: false })
                      : onUpdateSection({ ...section, freeSeating: true })
                  }
                />
                {!options?.disableSectionDelete && (
                  <Trash2
                    size={22}
                    className={twMerge(
                      "hover:text-gray-500 flex-shrink-0 cursor-pointer transition-all duration-medium",
                      index === 0 && "opacity-0 pointer-events-none"
                    )}
                    onClick={() => onDeleteSection(section.id)}
                  />
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

const SectionSelector = ({ firstElement, selectedElementIds, options }: IControlProps & Record<string, any>) => {
  const sections = useSelector((state: any) => state.editor.sections);
  return (
    <>
      <div className="w-full flex justify-between items-center gap-12">
        <Callout className="font-semibold">Sections</Callout>
        <Popover>
          <PopoverTrigger>
            <Caption className="text-blue-500 hover:text-blue-600 transform translate-y-0.5 cursor-pointer transition-all duration-medium">
              Manage
            </Caption>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-80 py-4 mr-4">
            <SectionManager options={options} />
          </PopoverContent>
        </Popover>
      </div>
      <Select
        key={selectedElementIds?.join(",")}
        onValueChange={(value) => {
          store.dispatch(updatePolylines({ ids: selectedElementIds, data: { section: +value === 0 ? null : value } }));
        }}
        defaultValue={firstElement?.getAttribute?.(dataAttributes.section) || undefined}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {sections.map((section) => (
            <SelectItem key={section.id} value={section.id}>
              <div className="flex gap-3 items-center">
                {section.id === "0" ? (
                  <div className="w-4 h-0.5 bg-black" />
                ) : (
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: section.color }} />
                )}{" "}
                {section.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SectionSelector;
