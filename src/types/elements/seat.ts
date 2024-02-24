import { SeatStatus } from "@/constants";

export interface ISeatCategory {
  id: string;
  name: string;
  color: string;
  textColor: string;
  cost: number;
}

export interface ISeat {
  id: string;
  x: number;
  y: number;
  label?: string;
  category?: string;
  status?: SeatStatus;
}
