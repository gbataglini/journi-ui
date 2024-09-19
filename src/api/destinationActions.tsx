import { ICountry, IDestination } from "./interfaces";

export function destinationActions() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  return {
    async addDestination(destination: IDestination): Promise<number | null> {
      let newDestinationId = null;
      let body = {
        userId: 1,
        city: destination.city,
        country: destination.country,
        visited: destination.visited,
        destinationType: destination.destinationType,
        googleMapsId: destination.id,
        location: {
          lat: destination.location!.lat,
          lng: destination.location!.lng,
        },
      };
      try {
        let response = await fetch(SERVER_URL + `/api/v1/destinations`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          method: "POST",
          body: JSON.stringify(body),
        });

        if (response.ok) {
          newDestinationId = await response.json();
        }
      } catch (err) {
        console.log(`Could not add destination: ${err}`);
      }
      return newDestinationId;
    },

    async getCities(userId: number): Promise<IDestination[]> {
      let allDestinations: IDestination[] = [];

      try {
        const response = await fetch(
          SERVER_URL + `/api/v1/${userId}/destinations`,
          {}
        );

        if (response.ok) {
          let fmtResponse = await response.json();
          allDestinations = fmtResponse;
        }
      } catch (err) {
        console.log(`Could not get destinations: ${err}`);
      }
      return allDestinations;
    },

    async getCountries(userId: number): Promise<ICountry[]> {
      let allDestinations: ICountry[] = [];

      try {
        const response = await fetch(
          SERVER_URL + `/api/v1/${userId}/countries`,
          {}
        );

        if (response.ok) {
          let fmtResponse = await response.json();
          allDestinations = fmtResponse;
        }
      } catch (err) {
        console.log(`Could not get destinations: ${err}`);
      }
      return allDestinations;
    },

    async getDestinationByID(
      userId: number,
      destinationID: number
    ): Promise<IDestination> {
      let destinationDetails: IDestination = {
        id: 0,
        city: "",
        country: "",
        visited: false,
        destinationType: "",
      };

      try {
        const response = await fetch(
          SERVER_URL + `/api/v1/${userId}/destinations/${destinationID}`
        );

        if (response.ok) {
          let fmtResponse = await response.json();
          destinationDetails = fmtResponse;
        }
      } catch (err) {
        console.log(`Could not get destination ID ${destinationID}: ${err}`);
      }
      return destinationDetails;
    },
  };
}
