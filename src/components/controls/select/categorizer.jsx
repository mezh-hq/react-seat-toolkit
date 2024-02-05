import { useSelector } from "react-redux";
import { Callout, Caption, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../core";

const Categorizer = () => {
  const categories = useSelector((state) => state.editor.categories);
  return (
    <>
      <div className="w-full flex justify-between items-center gap-12">
        <Callout className="font-semibold">Categories</Callout>
        <Caption className="text-blue-500 hover:text-blue-600 transform translate-y-0.5 cursor-pointer transition-all duration-medium">
          Manage
        </Caption>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default Categorizer;
