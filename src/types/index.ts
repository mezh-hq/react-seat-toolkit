import type {
  IFreeSeat,
  IImage,
  IPolyline,
  IPopulatedSeat,
  ISeat,
  ISeatCategory,
  ISection,
  IShape,
  IText
} from "./elements";
import { IPlugins } from "./plugins";
import type { IStyles } from "./styles";

export * from "./elements";
export * from "./plugins";

export type STKMode = "designer" | "user";

export type SeatSelectionMode = "default" | "chain";

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IEvents {
  onSeatClick?: (seat: IPopulatedSeat) => void;
  /** Triggered once a free seating section is clicked */
  onFreeSeatClick?: (seat: IFreeSeat) => void;
  /** Only applicable in user mode */
  onSeatHover?: (seat: IPopulatedSeat, coords: ICoordinates) => void;
  /** Only applicable in user mode */
  onSeatLeave?: (seat: IPopulatedSeat, coords: ICoordinates) => void;
  /** Only applicable in user mode */
  onSeatSelectionChange?: (seats: IPopulatedSeat[]) => void;
  /** Only applicable in user mode. Fired when the user tries to select more seats than the maxSeatSelectionCount */
  onMaxSeatSelectionCountReached?: () => void;
  onWorkspaceHover?: () => void;
  onWorkspaceLoad?: () => void;
  onSectionClick?: (section: ISection) => void;
  onExport?: (data: ISTKData) => unknown;
  /** Only used when the reload button is enabled */
  onReload?: () => void;
}

export interface ISTKData {
  name?: string;
  categories?: ISeatCategory[];
  sections?: ISection[];
  seats?: ISeat[];
  text?: IText[];
  shapes?: IShape[];
  polylines?: IPolyline[];
  images?: IImage[];
  workspace?: {
    initialViewBoxScale?: number;
    initialViewBoxScaleForWidth?: number;
    visibilityOffset?: number;
  };
}

export interface ISTKProps {
  mode: STKMode;
  /** Only applicable in user mode. If set to "chain", user can select multiple seats in a row without pressing ctrl and needs to reclick a selected seat to deselect it. */
  seatSelectionMode?: SeatSelectionMode;
  events?: IEvents;
  data?: ISTKData;
  styles?: IStyles;
  options?: {
    showGridSwitch?: boolean;
    showSeatLabels?: boolean;
    showZoomControls?: boolean;
    showVisibilityControls?: boolean;
    showReloadButton?: boolean;
    exportButtonText?: string;
    operationTriggerIcon?: React.FC;
    seatIcon?: React.FC<any>;
    selectedSeatIcon?: React.FC<any>;
    /** Only applicable in user mode. If provided, will stop the user from selecting more seats than the provided number. */
    maxSeatSelectionCount?: number;
    /** Maximum size of an image which can be added to the workspace in bytes */
    maxImageSize?: number;
    /** Overrides the default input placeholder at the top left corner of the screen */
    locationInputPlaceholder?: string;
    disableCategoryDelete?: boolean;
    /** Disables category deletion if there are reserved seats falling under the category */
    disableCategoryDeleteIfReserved?: boolean;
    disableSectionDelete?: boolean;
    shapes?: {
      icons: React.FC<any>[];
      overrideDefaultIconset?: boolean;
    };
  };
  plugins?: IPlugins;
}
