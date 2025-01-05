export interface IDestination {
  id: number;
  name?: string;
  city: string;
  country: string;
  visited: boolean;
  destinationType: string;
  lat?: string;
  lng?: string;
  googleMapsId?: string;
}

export interface ICountry {
  country: string;
  visited: boolean;
  destinationType: string[];
}

export interface IEstablishment {
  id: number;
  name: string;
  address?: string;
}

export interface IDropdownOption {
  id: string | number;
  text: string;
}
