import { IDestination, IEstablishment } from "./interfaces";

export function mapsApiActions() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  return {
    async searchSuggestions(searchParam: string): Promise<IDestination[]> {
      let suggestions: IDestination[] = [];
      try {
        const response = await fetch(
          SERVER_URL +
            `/api/v1/destinations/autocomplete?searchParam=${searchParam}`,
          {}
        );

        if (response.ok) {
          let fmtResponse = await response.json();
          let predictions = fmtResponse.predictions;

          for (let i = 0; i < predictions.length; i++) {
            suggestions.push({
              id: predictions[i].place_id,
              name: predictions[i].description,
              city: predictions[i].terms[0].value,
              country: predictions[i].terms.at(-1).value,
              visited: false,
            });
          }
        }
      } catch (err) {
        console.log(`Could not get suggestions: ${err}`);
      }
      return suggestions;
    },

    async googlePlaceDetails(
      selectedPlace: IDestination
    ): Promise<IDestination> {
      let placeDetails: IDestination = selectedPlace;
      try {
        const response = await fetch(
          SERVER_URL +
            `/api/v1/destinations/placesDetails?locationId=${selectedPlace.id}`,
          {}
        );

        if (response.ok) {
          let fmtResponse = await response.json();
          let details = fmtResponse.geometry.location;
          placeDetails = {
            id: selectedPlace.id,
            name: selectedPlace.name,
            city: selectedPlace.city,
            country: selectedPlace.country,
            visited: false,
            location: {
              lat: details.lat,
              lng: details.lng,
            },
          };
        }
      } catch (err) {
        console.log(`Could not get location details: ${err}`);
      }
      return placeDetails;
    },

    async googleEstablishmentDetails(
      selectedEst: IEstablishment
    ): Promise<IEstablishment> {
      let estDetails: IEstablishment = selectedEst;
      try {
        const response = await fetch(
          SERVER_URL +
            `/api/v1/destinations/placesDetails?locationId=${selectedEst.id}`,
          {}
        );

        if (response.ok) {
          let fmtResponse = await response.json();

          estDetails = {
            id: fmtResponse.id,
            name: fmtResponse.name,
            address: fmtResponse.formatted_address,
          };
        }
      } catch (err) {
        console.log(`Could not get location details: ${err}`);
      }
      return estDetails;
    },

    async googlePlaceEstablishments(
      input: string,
      destination: IDestination | null
    ): Promise<IEstablishment[]> {
      let suggestions: IEstablishment[] = [];
      try {
        const response = await fetch(
          SERVER_URL +
            `/api/v1/destinations/establishmentSearch?searchParam=${input}&lat=${destination?.location?.lat}&lng=${destination?.location?.lng}`,
          {}
        );
        if (response.ok) {
          let fmtResponse = await response.json();
          let predictions = fmtResponse.predictions;

          for (let i = 0; i < predictions.length; i++) {
            suggestions.push({
              id: predictions[i].place_id,
              name: predictions[i].description,
            });
          }
        }
      } catch (err) {
        console.log(`Could not get establishment suggestions: ${err}`);
      }
      return suggestions;
    },
  };
}
