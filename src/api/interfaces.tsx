export interface IDestination {
  id: number;
  name?: string;
  city: string;
  country: string;
  visited: boolean;
  bounds?: ILocationBounds;
}

export interface ILocationBounds {
  northEast: IBoundProperties;
  southWest: IBoundProperties;
}

export interface IBoundProperties {
  lat: string;
  lng: string;
}
