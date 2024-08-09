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
              id: i,
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
  };
}
