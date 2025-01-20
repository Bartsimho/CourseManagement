export interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
  image: string;
}

export interface LocationOption {
  id: number;
  name: string;
  description: string;
  image: string;
  distance?: number;
}