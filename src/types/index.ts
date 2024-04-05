import type {
  IBooth,
  IImage,
  IPolyline,
  IPopulatedSeat,
  ISeat,
  ISeatCategory,
  ISection,
  IShape,
  IText
} from "./elements";
import type { IStyles } from "./styles";

export * from "./elements";

export type STKMode = "designer" | "user";

export type SeatSelectionMode = "default" | "chain";

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IEvents {
  onSeatClick?: (seat: IPopulatedSeat) => void;
  /** Only applicable in user mode */
  onSeatHover?: (seat: IPopulatedSeat, coords: ICoordinates) => void;
  /** Only applicable in user mode */
  onSeatLeave?: (seat: IPopulatedSeat, coords: ICoordinates) => void;
  /** Only applicable in user mode */
  onSeatSelectionChange?: (seats: IPopulatedSeat[]) => void;
  onWorkspaceHover?: () => void;
  onSectionClick?: (section: ISection) => void;
  onExport?: (data: ISTKData) => void;
  onWorkspaceLoad?: () => void;
}

export interface ISTKData {
  name?: string;
  categories?: ISeatCategory[];
  sections?: ISection[];
  seats?: ISeat[];
  booths?: IBooth[];
  text?: IText[];
  shapes?: IShape[];
  polylines?: IPolyline[];
  images?: IImage[];
  workspace?: {
    initialViewBoxScale?: number;
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
    showFooter?: boolean;
    showZoomControls?: boolean;
    showVisibilityControls?: boolean;
    showReloadButton?: boolean;
    exportButtonText?: string;
    operationTriggerIcon?: React.FC;
    seatIcon?: React.FC<any>;
    selectedSeatIcon?: React.FC<any>;
  };
}
