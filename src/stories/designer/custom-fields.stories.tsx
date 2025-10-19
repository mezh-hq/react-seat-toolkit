import SeatToolkit from "@/index";
import { ICustomFieldDefinition } from "@/types";
import { STKMode } from "../_utils";
import { options } from "../options";

export default {
  title: "Designer/Custom Fields",
  component: SeatToolkit,
  ...options
};

const seatCustomFields: ICustomFieldDefinition[] = [
  {
    name: "price",
    label: "Ticket Price",
    type: "number",
    required: true,
    placeholder: "Enter price"
  },
  {
    name: "accessibility",
    label: "Wheelchair Accessible",
    type: "checkbox"
  },
  {
    name: "view",
    label: "View Quality",
    type: "select",
    options: ["Excellent", "Good", "Fair", "Limited"],
    placeholder: "Select view quality"
  }
];

const categoryCustomFields: ICustomFieldDefinition[] = [
  {
    name: "basePrice",
    label: "Base Price",
    type: "number",
    required: true,
    placeholder: "Enter base price"
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Category description"
  }
];

const sectionCustomFields: ICustomFieldDefinition[] = [
  {
    name: "capacity",
    label: "Maximum Capacity",
    type: "number",
    placeholder: "Enter max capacity"
  },
  {
    name: "location",
    label: "Physical Location",
    type: "text",
    placeholder: "e.g., Upper deck, Ground floor"
  },
  {
    name: "premium",
    label: "Premium Section",
    type: "checkbox"
  }
];

export const Story = {
  render: (props) => (
    <SeatToolkit
      mode={STKMode.DESIGNER}
      data={{}}
      options={{
        customFields: {
          seat: seatCustomFields,
          category: categoryCustomFields,
          section: sectionCustomFields
        }
      }}
      {...props}
    />
  )
};
