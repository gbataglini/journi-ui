import React from "react";
import styles from "./ui.module.css";
import { FaLeaf, FaBuilding, FaTree } from "react-icons/fa";
import { FaUmbrellaBeach, FaBuildingColumns } from "react-icons/fa6";
import { IDestination } from "../../api/interfaces";

interface DestinationCardProps {
  destination: IDestination;
}
const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className={styles.destinationCard}>
      {destination.destinationType === "Beach Holiday" && (
        <div className={styles.beachHolidayIcon}>
          <FaUmbrellaBeach size={40} />
        </div>
      )}
      {destination.destinationType === "City Break" && (
        <div className={styles.cityBreakIcon}>
          <FaBuildingColumns size={40} />
        </div>
      )}
      {destination.destinationType === "Nature Escape" && (
        <div className={styles.natureEscapeIcon}>
          <FaTree size={40} />
        </div>
      )}
      <div className={styles.destinationCardContent}>
        <h2 className={styles.destinationCardTitle}>{destination.city}</h2>
        <div className={styles.row}>
          <h3 className={styles.destinationCardSubtitle}>
            {destination.country}
          </h3>
          <div className={styles.badge}>
            {destination.visited ? "Visited" : "Not Visited"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
