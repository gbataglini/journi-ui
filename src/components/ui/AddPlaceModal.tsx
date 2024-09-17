import React, { useState } from "react";
import styles from "./ui.module.css";
import Modal from "./Modal";
import { GiTowerBridge } from "react-icons/gi";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { IDestination, IEstablishment } from "../../api/interfaces";
import { debounce } from "../../utils/debounce";
import { mapsApiActions } from "../../api/mapsApiActions";
import { destinationActions } from "../../api/destinationActions";
import Button from "./PillButton";

interface AddPlaceModalProps {
  modalType: string;
  modalHeader: string;
  onClose: () => void;
  selectedDestination: IDestination;
}

const AddPlaceModal: React.FC<AddPlaceModalProps> = ({
  modalType,
  modalHeader,
  onClose,
  selectedDestination,
}) => {
  const { googlePlaceEstablishments, googleEstablishmentDetails } =
    mapsApiActions();

  const [establishmentSuggestions, setEstablishmentSuggestions] = useState<
    IEstablishment[]
  >([{ id: 0, name: "" }]);

  const [selectedEstablishment, setSelectedEstablishment] =
    useState<IEstablishment>({ id: 0, name: "" });

  async function handleEstablishmentSearch(input: string) {
    const result = await googlePlaceEstablishments(input, selectedDestination);
    setEstablishmentSuggestions(result);
  }

  async function getEstablishmentDetails(establishment: IEstablishment) {
    const result = await googleEstablishmentDetails(establishment);
    setSelectedEstablishment(result);
  }

  return (
    <Modal modalHeader={modalHeader} onClose={() => onClose()}>
      <>
        <div className={styles.row}>
          <GiTowerBridge size={45} className={styles.iconTile} />
          {selectedEstablishment.id === 0 ? (
            <ReactSearchAutocomplete
              className={styles.searchBar}
              items={establishmentSuggestions}
              onSearch={debounce(handleEstablishmentSearch, 300)}
              onSelect={(est: IEstablishment) => getEstablishmentDetails(est)}
            />
          ) : (
            <>
              <div>
                <h3>{selectedEstablishment.name}</h3>
                <p>{selectedEstablishment.address}</p>
              </div>
              <div>
                <Button
                  text="Add to List"
                  onClick={() => console.log(selectedEstablishment)}
                  hasIcon
                />
              </div>
            </>
          )}
        </div>
      </>
    </Modal>
  );
};

export default AddPlaceModal;
