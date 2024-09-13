import { IDestination } from "./interfaces";

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
    async getDestinations(userId: number): Promise<IDestination[]> {
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
  };
}
