import { disableArgTypes, prefixKeys } from "./_utils";

export const options = {
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    ...disableArgTypes(["options"]),
    ...prefixKeys(
      {
        showFooter: {
          control: "boolean",
          description: "Show or hide the footer",
          defaultValue: { summary: true }
        },
        showGridSwitch: {
          control: "boolean",
          description: "Show or hide the grid switch",
          defaultValue: { summary: true }
        },
        showSeatLabels: {
          control: "boolean",
          description: "Show or hide the seat labels",
          defaultValue: { summary: true }
        },
        showZoomControls: {
          control: "boolean",
          description: "Show or hide the zoom controls",
          defaultValue: { summary: true }
        },
        showVisibilityControls: {
          control: "boolean",
          description: "Show or hide the visibility controls",
          defaultValue: { summary: true }
        },
        showReloadButton: {
          control: "boolean",
          description: "Show or hide the reload button",
          defaultValue: { summary: false }
        },
        exportButtonText: {
          control: "text",
          description: "Custom text for the export button",
          defaultValue: { summary: "Export" }
        },
        operationTriggerIcon: {
          control: "function",
          description: "React component to use in place of the operation trigger icon"
        },
        seatIcon: {
          control: "function",
          description: "React component to use as a seat icon"
        },
        selectedSeatIcon: {
          control: "function",
          description: "React component to use as a selected seat icon"
        },
        maxSeatSelectionCount: {
          control: "number",
          description:
            "Maximum number of seats that can be selected. Only applicable in user mode. Defaults to infinity."
        },
        maxImageSize: {
          control: "number",
          description: "Maximum size of an image which can be added to the workspace in bytes"
        },
        locationInputPlaceholder: {
          control: "text",
          description: "Placeholder text for the location input"
        },
        disableCategoryDelete: {
          control: "boolean",
          description: "Disable category deletion",
          defaultValue: { summary: false }
        },
        disableCategoryDeleteIfReserved: {
          control: "boolean",
          description: "Disable category deletion if there are reserved seats falling under the category",
          defaultValue: { summary: false }
        },
        disableSectionDelete: {
          control: "boolean",
          description: "Disable section deletion",
          defaultValue: { summary: false }
        }
      },
      "options."
    ),
    ...disableArgTypes(["events"]),
    ...prefixKeys(
      {
        onSeatClick: {
          description: "Fired when a seat is clicked"
        },
        onFreeSeatClick: {
          description: "Fired when a free seat is clicked"
        },
        onSeatHover: {
          description: "Fired when a seat is hovered over"
        },
        onSeatLeave: {
          description: "Fired when a seat is no longer hovered over"
        },
        onSeatSelectionChange: {
          description: "Fired when the selected seats change. Only applicable in user mode."
        },
        onMaxSeatSelectionCountReached: {
          description: "Fired when the user tries to select more seats than the maxSeatSelectionCount"
        },
        onWorkspaceHover: {
          description: "Fired when the workspace is hovered over"
        },
        onWorkspaceLoad: {
          description: "Fired when the workspace is loaded"
        },
        onSectionClick: {
          description: "Fired when a section is clicked"
        },
        onExport: {
          description: "Fired when the export button is clicked"
        },
        onReload: {
          description: "Fired when the reload button is clicked"
        }
      },
      "events."
    )
  }
};

export default options;
