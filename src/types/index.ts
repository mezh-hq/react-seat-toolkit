import { IBooth, IImage, IPolyline, ISeat, ISeatCategory, ISection, IShape, IText } from "./elements";

export * from "./elements";

export enum STKMode {
  Designer = "designer",
  User = "user"
}

export interface IEvents {
  onSeatClick?: (seat: ISeat & { category?: ISeatCategory }) => void;
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
}
