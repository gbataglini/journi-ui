import React from "react";
import styles from "./Navbar.module.css";
import propeller from "../../assets/images/propeller.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const location = window.location.href;
  const auth = useAuth();

  return (
    <div className={styles.Container}>
      <img src={propeller} width={48} height={48} alt="propeller icon" />

      {auth.token === "" ? (
        <>
          <Link
            className={
              location.indexOf("signin") > -1
                ? styles.selectedLink
                : styles.animatedLink
            }
            to={`/login`}
          >
            Sign In
          </Link>

          <Link
            className={
              location.indexOf("signin") > -1
                ? styles.selectedLink
                : styles.animatedLink
            }
            to={`/login`}
          >
            Sign Up
          </Link>
        </>
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

          <Link
            className={
              location.indexOf("signin") > -1
                ? styles.selectedLink
                : styles.animatedLink
            }
            onClick={() => auth.logout()}
            to={`/login`}
          >
            Sign out
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
