import { getPb } from "../backend/pocketbase";
import { ICountry, IDestination } from "./interfaces";

export function destinationActions() {
  const pb = getPb();

  return {
    async addDestination(destination: IDestination): Promise<IDestination> {
      console.log(pb.authStore.record?.id);
      let body = {
        userId: pb.authStore.record?.id,
        city: destination.city,
        country: destination.country,
        visited: destination.visited,
        destinationType: destination.destinationType,
        googleMapsId: destination.id,
        lat: destination.lat,
        lng: destination.lng,
      };

      const record = await pb
        .collection("destinations")
        .create<IDestination>(body);
      return record;
    },

    async getAllDestinations(): Promise<IDestination[]> {
      const resultList = await pb
        .collection("destinations")
        .getList<IDestination>(1, 50, {});

      return resultList.items;
    },

    async getAllCountries(): Promise<ICountry[]> {
      const resultList = await pb
        .collection("countries")
        .getList<ICountry>(1, 50);

      return resultList.items;
    },

    async getDestinationByID(destinationID: string): Promise<IDestination> {
      const record = await pb
        .collection("destinations")
        .getOne<IDestination>(destinationID);

      return record;
    },
    async getRandomDestination(): Promise<IDestination> {
      const randomDestination = await pb
        .collection("random_destination")
        .getList<IDestination>(1, 1);

      return randomDestination.items[0];
    },
    async getRandomUnvisitedDestination(): Promise<IDestination> {
      const randomDestination = await pb
        .collection("random_destination_not_visited")
        .getList<IDestination>(1, 1);

      return randomDestination.items[0];
    },
  };
}
