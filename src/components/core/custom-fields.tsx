import { ChangeEvent } from "react";
import { ICustomFieldDefinition } from "@/types";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Switch } from "./switch";

interface ICustomFieldsProps {
  definitions?: ICustomFieldDefinition[];
  values?: Record<string, any>;
  onChange: (fieldName: string, value: any) => void;
}

export const CustomFields: React.FC<ICustomFieldsProps> = ({ definitions, values = {}, onChange }) => {
  if (!definitions || definitions.length === 0) {
    return null;
  }

  const handleInputChange = (fieldName: string, e: ChangeEvent<HTMLInputElement>) => {
    onChange(fieldName, e.target.value);
  };

  const handleNumberChange = (fieldName: string, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    onChange(fieldName, value);
  };

  const handleSwitchChange = (fieldName: string, checked: boolean) => {
    onChange(fieldName, checked);
  };

  return (
    <div className="flex flex-col gap-3">
      {definitions.map((field) => {
        const value = values[field.name] ?? field.defaultValue;

        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            {field.type === "text" && (
              <Input
                type="text"
                value={value || ""}
                onChange={(e) => handleInputChange(field.name, e)}
                placeholder={field.placeholder}
                className="h-8"
              />
            )}

            {field.type === "number" && (
              <Input
                type="number"
                value={value ?? ""}
                onChange={(e) => handleNumberChange(field.name, e)}
                placeholder={field.placeholder}
                className="h-8"
              />
            )}

            {field.type === "select" && field.options && (
              <Select
                value={value?.toString() || ""}
                onValueChange={(newValue) => onChange(field.name, newValue)}
              >
                <SelectTrigger className="w-full h-8">
                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === "checkbox" && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={value || false}
                  onCheckedChange={(checked) => handleSwitchChange(field.name, checked)}
                />
                <span className="text-sm text-gray-600">{field.placeholder || field.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
