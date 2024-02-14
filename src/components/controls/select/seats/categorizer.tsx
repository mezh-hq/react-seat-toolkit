import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/components/core";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { addCategory, deleteCategory, updateCategory, updateSeat } from "@/store/reducers/editor";
import { Callout, Caption, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../core";

const onAddCategory = () => store.dispatch(addCategory(undefined));

const onDeleteCategory = (id: string) => store.dispatch(deleteCategory(id));

const onUpdateCategory = debounce((category) => store.dispatch(updateCategory(category)), 150);

const Categorizer = ({ firstElement, selectedElementIds }) => {
  const categories = useSelector((state: any) => state.editor.categories);

  return (
    <>
      <div className="w-full flex justify-between items-center gap-12">
        <Callout className="font-semibold">Categories</Callout>
        <Popover>
          <PopoverTrigger>
            <Caption className="text-blue-500 hover:text-blue-600 transform translate-y-0.5 cursor-pointer transition-all duration-medium">
              Manage
            </Caption>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-80 py-4 mr-4">
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="font-bold leading-none pb-1">Manage Categories</h4>
                <hr />
                <span
                  className="hover:text-gray-500 cursor-pointer transition-all duration-medium"
                  onClick={onAddCategory}
                >
                  + Add Category
                </span>
                <hr />
              </div>
              <div className="flex flex-col gap-4">
                {categories.map((category) => (
                  <div key={`category-${category.id}`} className="flex justify-start items-center gap-4">
                    <input
                      defaultValue={category.color}
                      type="color"
                      className="flex-shrink-0 w-6 h-6 p-0 bg-white rounded-color-input"
                      onChange={(e) => onUpdateCategory({ ...category, color: e.target.value })}
                    />
                    <input
                      defaultValue={category.textColor}
                      type="color"
                      className="flex-shrink-0 w-6 h-6 p-0  bg-white square-color-input"
                      onChange={(e) => onUpdateCategory({ ...category, textColor: e.target.value })}
                    />
                    <Input
                      defaultValue={category.name}
                      className="h-8"
                      onChange={(e) => onUpdateCategory({ ...category, name: e.target.value })}
                    />
                    <Input
                      defaultValue={category.cost}
                      className="h-8 w-5/12"
                      onChange={(e) =>
                        onUpdateCategory({ ...category, cost: e.target.value ? parseFloat(e.target.value) : 0 })
                      }
                    />
                    <Trash2
                      size={22}
                      className="hover:text-gray-500 flex-shrink-0 cursor-pointer transition-all duration-medium"
                      onClick={() => onDeleteCategory(category.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Select
        onValueChange={(value) => {
          selectedElementIds.forEach((id: string) => store.dispatch(updateSeat({ id, category: value })));
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
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} /> {category.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default Categorizer;
