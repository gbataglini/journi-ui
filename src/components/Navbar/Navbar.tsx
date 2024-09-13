import React from "react";
import styles from "./Navbar.module.css";
import propeller from "../../assets/images/propeller.png";
import { Link } from "react-router-dom";

function Navbar() {
  const location = window.location.href;

  return (
    <div className={styles.Container}>
      <img src={propeller} width={48} height={48} alt="propeller icon" />
      <Link
        className={
          location.indexOf("home") > -1
            ? styles.selectedLink
            : styles.animatedLink
        }
        to={`/home`}
      >
        Home
      </Link>
      <Link
        className={
          location.indexOf("destinations") > -1
            ? styles.selectedLink
            : styles.animatedLink
        }
        to={`/destinations`}
      >
        Destinations
      </Link>
    </div>
  );
}

export default Navbar;
