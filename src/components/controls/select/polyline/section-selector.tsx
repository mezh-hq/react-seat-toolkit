import { DollarSign, Plus, Settings2, X } from "lucide-react";
import { useSelector } from "react-redux";
import { default as debounce } from "lodash/debounce";
import { twMerge } from "tailwind-merge";
import { IconButton, Input, Popover, PopoverContent, PopoverTrigger } from "@/components/core";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { addSection, deleteSection, updatePolylines, updateSection } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../core";

const onAddSection = () => store.dispatch(addSection(undefined));

const onDeleteSection = (id: string) => store.dispatch(deleteSection(id));

const onUpdateSection = debounce((section) => store.dispatch(updateSection(section)), 150);

type IControlProps = Pick<ISTKProps, "options" | "styles"> & { title?: string };

export const SectionManager = ({ options, title = "Sections" }: IControlProps) => {
  const sections = useSelector((state: any) => state.editor.sections);
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-4">
        <h6 className="font-medium text-sm">{title}</h6>
        <IconButton
          className="w-6 h-6 p-0"
          variant="secondary"
          icon={<Plus className="w-4 h-4" />}
          onClick={onAddSection}
        />
      </div>
      <div className="flex flex-col gap-4">
        {sections.map(
          (section, index) =>
            section.id !== "0" && (
              <div key={`category-${section.id}`} className="flex justify-start items-center gap-2">
                <input
                  defaultValue={section.color}
                  type="color"
                  className="flex-shrink-0 w-6 h-6 p-0 bg-white square-color-input"
                  onChange={(e) => onUpdateSection({ ...section, color: e.target.value })}
                />
                <input
                  defaultValue={section.stroke}
                  type="color"
                  className="flex-shrink-0 w-6 h-6 p-0 bg-white square-color-input"
                  onChange={(e) => onUpdateSection({ ...section, stroke: e.target.value })}
                />
                <Input
                  defaultValue={section.name}
                  className="h-8"
                  onChange={(e) => onUpdateSection({ ...section, name: e.target.value })}
                />
                <IconButton
                  className={twMerge("w-6 h-6 p-0 shrink-0", !section?.freeSeating && "text-gray-400")}
                  variant="secondary"
                  icon={<DollarSign className="w-4 h-4" />}
                  onClick={() =>
                    section?.freeSeating
                      ? onUpdateSection({ ...section, freeSeating: false })
                      : onUpdateSection({ ...section, freeSeating: true })
                  }
                />
                {!options?.disableSectionDelete && (
                  <IconButton
                    className="w-6 h-6 p-0 shrink-0"
                    variant="secondary"
                    icon={<X className="w-4 h-4" />}
                    onClick={() => onDeleteSection(section.id)}
                    disabled={index === 0}
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
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between items-center gap-4">
          <h6 className="font-medium text-sm">Sections</h6>
          <Popover>
            <PopoverTrigger>
              <IconButton
                className="w-6 h-6 p-0 shrink-0"
                variant="secondary"
                icon={<Settings2 className="w-4 h-4" />}
              />
            </PopoverTrigger>
            <PopoverContent className="bg-white w-80 py-4 mr-4">
              <SectionManager options={options} title="Options" />
            </PopoverContent>
          </Popover>
        </div>
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
