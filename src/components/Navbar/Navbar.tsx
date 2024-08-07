import React from "react";
import styles from "./Navbar.module.css";
import propeller from "../../assets/images/propeller.png";

function Navbar() {
  return (
    <div className={styles.Container}>
      <img src={propeller} width={48} height={48} alt="propeller icon" />
      <a>Home</a>
      <a>View Trips</a>
    </div>
  );
}

export default Navbar;
