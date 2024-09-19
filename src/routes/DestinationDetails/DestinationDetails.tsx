import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./DestinationDetails.module.css";
import { IDestination } from "../../api/interfaces";
import { destinationActions } from "../../api/destinationActions";
import Navbar from "../../components/Navbar/Navbar";
import LargeCard from "../../components/ui/LargeCard";
import PillButton from "../../components/ui/PillButton";
import AddPlaceModal from "../../components/ui/AddPlaceModal";

export default function DestinationDetails() {
  const { getDestinationByID } = destinationActions();

  const [searchParams, setSearchParams] = useSearchParams();
  const [destinationDetails, setDestinationDetails] = useState<IDestination>();
  const [showAddPlacemodal, setShowAddPlaceModal] = useState<boolean>(false);
  const destinationID = searchParams.get("destinationID");

  useEffect(() => {
    const getAllDestinations = async () => {
      setDestinationDetails(await getDestinationByID(1, Number(destinationID)));
    };
    getAllDestinations();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>{destinationDetails?.city}</h2>
      <h3>{destinationDetails?.country}</h3>
      <div className={styles.row}>
        <LargeCard cardTitle="Things to Do" iconName="caroussel">
          <div className={styles.centeredRow}>
            <PillButton
              text="Add"
              onClick={() => {
                setShowAddPlaceModal(true);
              }}
              hasIcon
              iconName={"add"}
            />
          </div>
        </LargeCard>
        <LargeCard cardTitle="Places to See" iconName="attraction"></LargeCard>
        <LargeCard
          cardTitle="Shopping
        "
          iconName="shopping"
        ></LargeCard>

        <LargeCard cardTitle="Restaurants & Cafés" iconName="boba"></LargeCard>
      </div>

      {showAddPlacemodal && (
        <AddPlaceModal
          modalHeader="Add New"
          selectedDestination={destinationDetails!}
          onClose={() => setShowAddPlaceModal(false)}
        />
      )}
    </div>
  );
}
