import React from "react";
import styles from "./Navbar.module.css";
import propeller from "../../assets/images/propeller.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.Container}>
      <img src={propeller} width={48} height={48} alt="propeller icon" />
      <Link className={styles.animatedLink} to={`/home`}>
        Home
      </Link>
      <Link className={styles.animatedLink} to={`/add`}>
        Add Destination
      </Link>
    </div>
  );
}

export default Navbar;
