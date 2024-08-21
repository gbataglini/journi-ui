import { IDestination } from "./interfaces";

export function destinationActions() {
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
          let details = fmtResponse.geometry.viewport;
          placeDetails = {
            id: selectedPlace.id,
            name: selectedPlace.name,
            city: selectedPlace.city,
            country: selectedPlace.country,
            visited: false,
            bounds: {
              northEast: {
                lat: details.northeast.lat,
                lng: details.northeast.lng,
              },
              southWest: {
                lat: details.southwest.lat,
                lng: details.southwest.lng,
              },
            },
          };
        }
      } catch (err) {
        console.log(`Could not get location details: ${err}`);
      }
      return placeDetails;
    },
  };
}
