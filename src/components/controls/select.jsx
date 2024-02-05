import { Callout, Caption, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../core";

const SelectControls = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between items-center gap-12">
        <Callout className="font-semibold">Categories</Callout>
        <Caption className="text-blue-500 transform translate-y-0.5">Manage</Caption>
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectControls;
