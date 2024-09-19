import React from "react";
import styles from "./ui.module.css";
import { FaTree } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  FaUmbrellaBeach,
  FaBuildingColumns,
  FaLocationDot,
} from "react-icons/fa6";

import { IconButton, Tooltip } from "@mui/material";

interface DestinationCardProps {
  title: string;
  subtitle: string;
  type: string;
  visited: boolean;
  onCardClick: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  title,
  type,
  visited,
  subtitle,
  onCardClick,
}) => {
  function renderIcon() {
    switch (type) {
      case "Beach Holiday":
        return (
          <div className={styles.beachHolidayIcon}>
            <FaUmbrellaBeach size={40} />
          </div>
        );
      case "City Break":
        return (
          <div className={styles.cityBreakIcon}>
            <FaBuildingColumns size={40} />
          </div>
        );
      case "Nature Escape":
        return (
          <div className={styles.natureEscapeIcon}>
            <FaTree size={40} />
          </div>
        );
      default:
        return (
          <div className={styles.defaultIcon}>
            <FaLocationDot size={40} />
          </div>
        );
    }
  }

  return (
    <div className={styles.destinationCard} onClick={() => onCardClick()}>
      {renderIcon()}
      <div className={styles.destinationCardContent}>
        <div className={styles.row}>
          <h2 className={styles.destinationCardTitle}>{title}</h2>

          {visited && (
            <div className={styles.badge}>
              <Tooltip title="Visited">
                <IconButton>
                  <BsPatchCheckFill size={24} className={styles.badge} />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>

        <h3 className={styles.destinationCardSubtitle}>{subtitle}</h3>
      </div>
    </div>
  );
};

export default DestinationCard;
