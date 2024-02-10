import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/components/core";
import { store } from "@/store";
import { addCategory, deleteCategory, updateCategory } from "@/store/reducers/editor";
import { Callout, Caption, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../core";

const onAddCategory = () => store.dispatch(addCategory(undefined));

const onDeleteCategory = (id: string) => store.dispatch(deleteCategory(id));

const onUpdateCategory = (category) => store.dispatch(updateCategory(category));

const Categorizer = () => {
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
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={`category-${category.id}`} className="flex items-center gap-4 relative">
                    <input
                      defaultValue={category.color}
                      type="color"
                      className="w-7 h-7 p-0 bg-white rounded-color-input"
                      onChange={(e) => onUpdateCategory({ ...category, color: e.target.value })}
                    />
                    <Input
                      defaultValue={category.name}
                      className="w-auto flex-grow h-8"
                      onChange={(e) => onUpdateCategory({ ...category, name: e.target.value })}
                    />
                    <Trash2
                      className="hover:text-gray-500 cursor-pointer transition-all duration-medium"
                      onClick={() => onDeleteCategory(category.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Select>
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
