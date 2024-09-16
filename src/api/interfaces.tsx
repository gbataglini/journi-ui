export interface IDestination {
  id: number;
  name?: string;
  city: string;
  country: string;
  visited: boolean;
  destinationType: string;
  location?: ILocationBounds;
  googleMapsId?: string;
}

export interface IEstablishment {
  id: number;
  name: string;
  address?: string;
}

export interface ILocationBounds {
  lat: string;
  lng: string;
}

export interface IDropdownOption {
  id: string | number;
  text: string;
}
