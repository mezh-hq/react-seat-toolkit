import { IBooth, IImage, IPolyline, IPopulatedSeat, ISeat, ISeatCategory, ISection, IShape, IText } from "./elements";
import { IStyles } from "./styles";

export * from "./elements";

export enum STKMode {
  Designer = "designer",
  User = "user"
}

export interface IEvents {
  onSeatClick?: (seat: IPopulatedSeat) => void;
  onSectionClick?: (section: ISection) => void;
  onExport?: (data: ISTKData) => void;
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
    exportButtonText?: string;
    operationTriggerIcon?: React.FC;
  };
}
