import { MouseEvent, useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { FileEdit, LayoutGrid, Plus, Settings2, X } from "lucide-react";
import { useSelector } from "react-redux";
import { default as debounce } from "lodash/debounce";
import { twMerge } from "tailwind-merge";
import { CustomFields, IconButton, Input, Popover, PopoverContent, PopoverTrigger } from "@/components/core";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { addCategory, deleteCategory, updateCategory, updateSeats } from "@/store/reducers/editor";
import { ISTKProps, SeatStatus } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../core";

const onAddCategory = () => store.dispatch(addCategory(undefined));

const onDeleteCategory = (id: string) => store.dispatch(deleteCategory(id));

const onUpdateCategory = debounce((category) => store.dispatch(updateCategory(category)), 150);

const onSectionSelect = (e: MouseEvent<HTMLButtonElement>) => {
  const element = e.target as HTMLButtonElement;
  const categoryId = element.getAttribute(dataAttributes.category);
  const sectionId = element.getAttribute(dataAttributes.section);
  store.dispatch(updateCategory({ id: categoryId, section: +sectionId === 0 ? null : sectionId }));
};

type IControlProps = Pick<ISTKProps, "options" | "styles"> & { title?: string };

export const CategoryManager = ({ options, title = "Categories" }: IControlProps) => {
  const categories = useSelector((state: any) => state.editor.categories);
  const sections = useSelector((state: any) => state.editor.sections);
  const seats = useSelector((state: any) => state.editor.seats);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const customFieldDefinitions = options?.customFields?.category;
  const hasCustomFields = customFieldDefinitions && customFieldDefinitions.length > 0;

  return (
    <div className="grid gap-4">
      <div className="flex gap-2 justify-between items-center">
        <h6 className="font-medium text-sm">{title}</h6>
        <IconButton
          className="w-6 h-6 p-0"
          variant="secondary"
          icon={<Plus className="w-4 h-4" />}
          onClick={onAddCategory}
        />
      </div>
      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          if (category.id === "0") return null;
          const displayDisabledDelete =
            options?.disableCategoryDeleteIfReserved &&
            seats?.some(
              (seat: any) =>
                seat.category === category.id &&
                (seat.status === SeatStatus.Reserved || seat.status === SeatStatus.Locked)
            );
          return (
            <div key={`category-${category.id}`} className="flex justify-start items-center gap-2">
              <input
                defaultValue={category.color}
                type="color"
                className="flex-shrink-0 w-6 h-6 p-0 bg-white square-color-input"
                onChange={(e) => onUpdateCategory({ ...category, color: e.target.value })}
              />
              <input
                defaultValue={category.textColor}
                type="color"
                className="flex-shrink-0 w-6 h-6 p-0 bg-white square-color-input"
                onChange={(e) => onUpdateCategory({ ...category, textColor: e.target.value })}
              />
              <Input
                defaultValue={category.name}
                className="h-8"
                onChange={(e) => onUpdateCategory({ ...category, name: e.target.value })}
              />
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    className={twMerge("w-6 h-6 p-0 shrink-0", !category.section && "text-gray-400")}
                    variant="secondary"
                    icon={<LayoutGrid className="w-4 h-4" />}
                  />
                </PopoverTrigger>
                <PopoverContent className="bg-white w-auto p-0 mr-4">
                  {sections.map((section) => (
                    <PopoverClose
                      key={section.id}
                      className={twMerge(
                        "w-full flex gap-3 items-center py-2 px-4 text-base cursor-pointer hover:bg-gray-100 transition-all duration-medium",
                        section.id === "0" && "justify-center border-b border-gray-200 pb-2",
                        section.id === category.section && "bg-blue-50 "
                      )}
                      {...{ [dataAttributes.section]: section.id }}
                      {...{ [dataAttributes.category]: category.id }}
                      onClick={onSectionSelect}
                    >
                      {section.id !== "0" && (
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: section.color }} />
                      )}
                      {section.name}
                    </PopoverClose>
                  ))}
                </PopoverContent>
              </Popover>
              {hasCustomFields && (
                <Popover open={editingCategoryId === category.id} onOpenChange={(open) => setEditingCategoryId(open ? category.id : null)}>
                  <PopoverTrigger>
                    <IconButton
                      className={twMerge("w-6 h-6 p-0 shrink-0", !category.customFields && "text-gray-400")}
                      variant="secondary"
                      icon={<FileEdit className="w-4 h-4" />}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="bg-white w-80 py-4 px-4 mr-4">
                    <div className="flex flex-col gap-3">
                      <h6 className="font-medium text-sm">Custom Fields</h6>
                      <CustomFields
                        definitions={customFieldDefinitions}
                        values={category.customFields || {}}
                        onChange={(fieldName, value) => {
                          const updatedCustomFields = { ...(category.customFields || {}), [fieldName]: value };
                          onUpdateCategory({ ...category, customFields: updatedCustomFields });
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              {!options?.disableCategoryDelete && (
                <IconButton
                  className="w-6 h-6 p-0 shrink-0"
                  variant="secondary"
                  icon={<X className="w-4 h-4" />}
                  onClick={() => onDeleteCategory(category.id)}
                  disabled={displayDisabledDelete}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Categorizer = ({ firstElement, selectedElementIds, options }: IControlProps & Record<string, any>) => {
  const categories = useSelector((state: any) => state.editor.categories);
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-4">
        <h6 className="font-medium text-sm">Categories</h6>
        <Popover>
          <PopoverTrigger>
            <IconButton className="w-6 h-6 p-0 shrink-0" variant="secondary" icon={<Settings2 className="w-4 h-4" />} />
          </PopoverTrigger>
          <PopoverContent className="bg-white w-80 py-4 mr-4">
            <CategoryManager options={options} title="Options" />
          </PopoverContent>
        </Popover>
      </div>
      <Select
        key={selectedElementIds?.join(",")}
        onValueChange={(value) => {
          store.dispatch(
            updateSeats({ ids: selectedElementIds, data: { category: +value === 0 ? undefined : value } })
          );
        }}
        defaultValue={firstElement?.getAttribute?.(dataAttributes.category) || undefined}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex gap-3 items-center">
                {category.id === "0" ? (
                  <div className="w-4 h-0.5 bg-black" />
                ) : (
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
                )}{" "}
                {category.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Categorizer;
