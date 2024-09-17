import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styles from "./AddDestination.module.css";
import doggo from "../assets/images/doggo.png";
import { mapsApiActions } from "../api/mapsApiActions";
import { destinationActions } from "../../src/api/destinationActions";
import { debounce } from "../utils/debounce";
import { ICountry, IDestination } from "../api/interfaces";
import { Button, ButtonGroup, Checkbox } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import BadgeDropdown from "../components/ui/BadgeDropdown";
import DestinationCard from "../components/ui/DestinationCard";
import PillButton from "../components/ui/PillButton";

export default function AddDestination() {
  const { searchSuggestions, googlePlaceDetails } = mapsApiActions();

  const { addDestination, getCities, getCountries } = destinationActions();

  const [suggestions, setSuggestions] = useState<IDestination[]>([
    {
      id: 0,
      city: "",
      country: "",
      visited: false,
      destinationType: "",
    },
  ]);
  const [selectedDestination, setSelectedDestination] =
    useState<IDestination | null>(null);

  const [destinations, setDestinations] = useState<(IDestination | ICountry)[]>(
    []
  );

  useEffect(() => {
    const getAllDestinations = async () => {
      setDestinations(await getCities(1));
    };
    getAllDestinations();
  }, []);

  async function handleOnSearch(input: string) {
    const results = await searchSuggestions(input);
    setSuggestions(results);
  }

  async function handleAddDestination(destination: IDestination) {
    try {
      addDestination(destination)
        .then((response) =>
          response != null
            ? destinations.push(destination)
            : console.log("Could not add destination")
        )
        .then(() => setSelectedDestination(null));
    } catch (err) {
      console.log(`could not add destination: ${err}`);
    }
  }

  function handleVisitedChange(
    event: React.ChangeEvent<HTMLInputElement>,
    destination: IDestination
  ) {
    let currentDestination = destination;
    currentDestination.visited = event.target.checked;
    setSelectedDestination(currentDestination);
  }

  function handleDestinationTypeChange(value: string) {
    let currentDest = selectedDestination;
    currentDest!.destinationType = value;

    setSelectedDestination(currentDest);
  }

  async function getPlaceDetails(destination: IDestination) {
    const result = await googlePlaceDetails(destination);
    setSelectedDestination(result);
  }

  const dropdownOptions = ["Beach Holiday", "City Break", "Nature Escape"];

  return (
    <>
      <div className={styles.searchHeader}>
        <Navbar />
        <div className={styles.row}>
          {selectedDestination === null ? (
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
          ) : (
            <div className={styles.searchCol}>
              <h1>{selectedDestination.city}</h1>
              <div className={styles.row}>
                <h2>{selectedDestination.country}</h2>
                <BadgeDropdown
                  placeholder="Destination Type"
                  onChange={(value) => handleDestinationTypeChange(value)}
                  dropdownOptions={dropdownOptions}
                />
              </div>
              <div className={styles.row}>
                <Checkbox
                  size="medium"
                  sx={{
                    color: blue[900],
                    "&.Mui-checked": {
                      color: pink[500],
                    },
                  }}
                  onChange={(e) => handleVisitedChange(e, selectedDestination)}
                />
                <label>Visited</label>
              </div>
              <div className={styles.row}>
                <PillButton
                  buttonColour="dark-blue"
                  text="Add Destination"
                  onClick={() => handleAddDestination(selectedDestination)}
                  hasIcon={false}
                />
                <PillButton
                  buttonColour="dark-blue"
                  text="Cancel"
                  onClick={() => {
                    setSelectedDestination(null);
                  }}
                  hasIcon={false}
                />
              </div>
            </div>
          )}
          <img
            className={styles.headerImg}
            src={doggo}
            width={350}
            height={350}
            alt="holidog"
          />
        </div>
      </div>

      <div>
        {destinations != null && destinations.length > 0 ? (
          <>
            <div className={styles.centeredRow}>
              <ButtonGroup disableRipple>
                <Button
                  onClick={async () => setDestinations(await getCities(1))}
                >
                  Cities
                </Button>
                <Button
                  onClick={async () => setDestinations(await getCountries(1))}
                >
                  Countries
                </Button>
              </ButtonGroup>
            </div>
            <div className={styles.thirdRows}>
              {destinations.map((dest) => {
                return (
                  <DestinationCard
                    title={"city" in dest ? dest.city : dest.country}
                    subtitle={"city" in dest ? dest.country : ""}
                    visited={dest.visited}
                    type={
                      "city" in dest
                        ? dest.destinationType
                        : dest.destinationType[0]
                    }
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div> </div>
        )}
      </div>
    </>
  );
}
