import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styles from "./AddDestination.module.css";
import doggo from "../assets/images/doggo.png";
import { destinationActions } from "../../src/api/destinationActions";
import { debounce } from "../utils/debounce";
import { IDestination } from "../api/interfaces";

export default function AddDestination() {
  const { searchSuggestions } = destinationActions();
  const [suggestions, setSuggestions] = useState<IDestination[]>([
    { id: 0, city: "", country: "", visited: false },
  ]);
  const [selectedDestination, setSelectedDestination] = useState<IDestination>({
    id: 0,
    city: "",
    country: "",
    visited: false,
  });

  async function handleOnSearch(input: string) {
    const results = await searchSuggestions(input);
    setSuggestions(results);
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
              onSelect={(dest: IDestination) => setSelectedDestination(dest)}
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

      {selectedDestination !== undefined && (
        <div>
          <h2>{selectedDestination.city}</h2>
          <h3>{selectedDestination.country}</h3>
        </div>
      )}
    </>
  );
}
