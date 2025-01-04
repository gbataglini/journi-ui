import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PillButton from "../../components/ui/PillButton";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./UserLogin.module.css";
import TextInput from "../../components/ui/TextInput";
import planewindow from "../../assets/images/planewindow.png";
import { Link } from "react-router-dom";
function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  return (
    <div className={styles.pageBackground}>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.fieldsContainer}>
          <h2>
            Welcome to
            <br />
            Journi
          </h2>

          <div className={styles.inputContainer}>
            <TextInput
              value={username}
              onChange={(value) => setUsername(value)}
              type="email"
              placeholder="Email"
            />

            <TextInput
              value={password}
              onChange={(value) => setPassword(value)}
              type="password"
              placeholder="Password"
            />

            <div className={styles.forgotPassword}>
              <p className={styles.animatedLink}>Forgot password?</p>
            </div>

            <PillButton
              text="Sign In"
              onClick={async () => {
                await auth.login({ email: username, password: password });
              }}
              hasIcon={false}
            />

            <PillButton
              text="Sign Up"
              onClick={async () => {
                await auth.login({ email: username, password: password });
              }}
              hasIcon={false}
              buttonColour="solid-coral"
            />

            {auth.loginSuccess != null && !auth.loginSuccess && (
              <>
                <p className={styles.error}>
                  Wrong username or password. Please try again. Don't have an
                  account yet?
                </p>
                <Link className={styles.animatedLink} to="">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={planewindow} alt="plane window" />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
