export interface ISeatCategory {
  id: string;
  name: string;
  color: string;
  textColor: string;
  cost: number;
}

export enum SeatStatus {
  Available = "Available",
  Unavailable = "Unavailable",
  Reserved = "Reserved"
}

export interface ISeat {
  id: string;
  x: number;
  y: number;
  label?: string;
  category?: string | null;
  status?: SeatStatus | string;
}
