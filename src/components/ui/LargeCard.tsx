import React, { Children, PropsWithChildren } from "react";
import styles from "./ui.module.css";
import { GiBoba, GiArcTriomphe } from "react-icons/gi";

interface LargeCardProps {
  cardTitle: string;
  iconName: string;
}

const LargeCard: React.FC<PropsWithChildren<LargeCardProps>> = ({
  cardTitle,
  iconName,
  children,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {iconName === "boba" && (
          <GiBoba size={28} color="#FFF9EF" className={styles.cardIcon} />
        )}
        {iconName === "attraction" && (
          <GiArcTriomphe
            size={28}
            color="#FFF9EF"
            className={styles.cardIcon}
          />
        )}
        <p className={styles.cardHeaderTxt}>{cardTitle}</p>
      </div>
      {children}
    </div>
  );
};

export default LargeCard;
