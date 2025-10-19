import SeatToolkit from "@/index";
import { ICustomFieldDefinition } from "@/types";
import { STKMode } from "../_utils";
import { options } from "../options";

export default {
  title: "Designer/Custom Fields Import",
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

// Sample data with custom fields pre-populated
const sampleData = {
  name: "Concert Hall",
  categories: [
    {
      id: "cat-vip",
      name: "VIP",
      color: "#FFD700",
      textColor: "#000000",
      customFields: {
        basePrice: 200,
        description: "VIP section with the best views and amenities"
      }
    },
    {
      id: "cat-standard",
      name: "Standard",
      color: "#4169E1",
      textColor: "#FFFFFF",
      customFields: {
        basePrice: 50,
        description: "Regular seating with good views"
      }
    }
  ],
  sections: [
    {
      id: "sec-front",
      name: "Front Section",
      color: "#FF6347",
      stroke: "#8B0000",
      customFields: {
        capacity: 100,
        location: "Front of stage",
        premium: true
      }
    },
    {
      id: "sec-back",
      name: "Back Section",
      color: "#32CD32",
      stroke: "#006400",
      customFields: {
        capacity: 150,
        location: "Rear area",
        premium: false
      }
    }
  ],
  seats: [
    {
      id: "seat-1",
      x: 300,
      y: 200,
      label: "A1",
      category: "cat-vip",
      customFields: {
        price: 250,
        accessibility: true,
        view: "Excellent"
      }
    },
    {
      id: "seat-2",
      x: 350,
      y: 200,
      label: "A2",
      category: "cat-vip",
      customFields: {
        price: 250,
        accessibility: false,
        view: "Excellent"
      }
    },
    {
      id: "seat-3",
      x: 400,
      y: 200,
      label: "A3",
      category: "cat-standard",
      customFields: {
        price: 75,
        accessibility: true,
        view: "Good"
      }
    },
    {
      id: "seat-4",
      x: 300,
      y: 250,
      label: "B1",
      category: "cat-standard",
      customFields: {
        price: 60,
        accessibility: false,
        view: "Good"
      }
    },
    {
      id: "seat-5",
      x: 350,
      y: 250,
      label: "B2",
      category: "cat-standard",
      customFields: {
        price: 60,
        accessibility: false,
        view: "Fair"
      }
    }
  ]
};

export const Story = {
  render: (props) => (
    <SeatToolkit
      mode={STKMode.DESIGNER}
      data={sampleData}
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
