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

export interface IEvents {
  onSeatClick?: (seat: IPopulatedSeat) => void;
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
  events?: IEvents;
  data?: ISTKData;
  styles?: IStyles;
  options?: {
    showGridSwitch?: boolean;
    showSeatLabels?: boolean;
    showFooter?: boolean;
    showZoomControls?: boolean;
    showVisibilityControls?: boolean;
    exportButtonText?: string;
    operationTriggerIcon?: React.FC;
    seatIcon?: React.FC<any>;
    selectedSeatIcon?: React.FC<any>;
  };
}
