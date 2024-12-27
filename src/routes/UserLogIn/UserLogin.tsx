import { useEffect, useState } from "react";
import { getPb } from "../../backend/pocketbase";
import Navbar from "../../components/Navbar/Navbar";
import PillButton from "../../components/ui/PillButton";
import { useAuth } from "../../contexts/AuthContext";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  return (
    <div>
      <div>
        <Navbar />
        <div>
          <label>Email</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PillButton
            text="Sign In"
            onClick={async () => {
              await auth.login({ email: username, password: password });
            }}
            hasIcon={false}
          />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
