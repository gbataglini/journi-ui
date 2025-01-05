import { useEffect, useState } from "react";
import { getPb } from "../backend/pocketbase";
import Navbar from "../components/Navbar/Navbar";
import PillButton from "../components/ui/PillButton";

function Landing() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const pb = getPb();

  useEffect(() => {
    if (pb.authStore?.isValid) {
      window.location.href = "/destinations";
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <label>Email</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PillButton
          text="Sign In"
          onClick={() => {
            try {
              pb.collection("users").authWithPassword(username, password);

              window.location.href = "/destinations";
            } catch (e) {
              console.log(e);
            }
          }}
          hasIcon={false}
        />
      </div>
    </div>
  );
}

export default Landing;
