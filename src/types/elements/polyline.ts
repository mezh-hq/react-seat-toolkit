export interface ISection {
  id: string;
  name: string;
  color: string;
  stroke: string;
  freeSeating?: boolean;
}

export interface IPolylinepoint {
  x: number;
  y: number;
}

export interface IPolyline {
  id: string;
  points: IPolylinepoint[];
  color?: string;
  stroke?: string;
  section?: string;
  rotation?: number;
}
