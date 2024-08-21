import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styles from "./AddDestination.module.css";
import doggo from "../assets/images/doggo.png";
import { destinationActions } from "../../src/api/destinationActions";
import { debounce } from "../utils/debounce";
import { IDestination } from "../api/interfaces";
import LargeCard from "../components/ui/LargeCard";

export default function AddDestination() {
  const { searchSuggestions, googlePlaceDetails } = destinationActions();
  const [suggestions, setSuggestions] = useState<IDestination[]>([
    { id: 0, city: "", country: "", visited: false },
  ]);
  const [selectedDestination, setSelectedDestination] =
    useState<IDestination | null>(null);

  async function handleOnSearch(input: string) {
    const results = await searchSuggestions(input);
    setSuggestions(results);
  }

  async function getPlaceDetails(destination: IDestination) {
    const result = await googlePlaceDetails(destination);
    setSelectedDestination(result);
  }

  return (
    <>
      <div className={styles.searchHeader}>
        <Navbar />

        <div className={styles.row}>
          <div className={styles.searchCol}>
            <h1>Where To? </h1>

            <ReactSearchAutocomplete
              className={styles.searchBar}
              items={suggestions}
              onSearch={debounce(handleOnSearch, 300)}
              onSelect={(dest: IDestination) => getPlaceDetails(dest)}
              onClear={() => setSelectedDestination(null)}
              placeholder="Search by destination name"
            />
          </div>
          <img
            className={styles.headerImg}
            src={doggo}
            width={350}
            height={350}
            alt="propeller icon"
          />
        </div>
      </div>

      {selectedDestination !== null && (
        <div>
          <h2>{selectedDestination.city}</h2>
          <h3>{selectedDestination.country}</h3>

          <div className={styles.row}>
            <LargeCard
              cardTitle="Places to See"
              iconName="attraction"
            ></LargeCard>
            <LargeCard cardTitle="Restaurants & Cafés" iconName="boba">
              <p>test</p>
            </LargeCard>
          </div>
        </div>
      )}
    </>
  );
}
