import React from "react";
import styles from "./Navbar.module.css";
import propeller from "../../assets/images/propeller.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const location = window.location.href;
  const auth = useAuth();

  function setIconNavigation() {
    if (auth.token === "") {
      window.location.href = "/login";
    } else {
      window.location.href = "/home";
    }
  }

  return (
    <div className={styles.Container}>
      <img
        src={propeller}
        width={48}
        height={48}
        alt="propeller icon"
        onClick={() => setIconNavigation()}
      />

      {auth.token === "" ? (
        <div></div>
      ) : (
        <>
          <Link
            className={
              location.indexOf("home") > -1
                ? styles.selectedLink
                : styles.animatedLink
            }
            to={`/home`}
          >
            home
          </Link>
          <Link
            className={
              location.indexOf("destinations") > -1
                ? styles.selectedLink
                : styles.animatedLink
            }
            to={`/destinations`}
          >
            destinations
          </Link>

          <Link
            className={
              location.indexOf("signin") > -1
                ? styles.selectedLink
                : styles.animatedLink
            }
            onClick={() => auth.logout()}
            to={`/login`}
          >
            sign out
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
