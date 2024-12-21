import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import PillButton from "../components/ui/PillButton";

function Landing() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Navbar />
      <div>
        <label>Email</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />

        <PillButton
          text="Sign In"
          onClick={() => console.log(username, password)}
          hasIcon={false}
        />
      </div>
    </div>
  );
}

export default Landing;

/* 
ok so to navigate to another page, use this function: 

  function navigateTo() {
    window.location.href = `/{page name here}`;
  }
 if you want the log in page to direct to the user's destinations, change the function body to:   window.location.href = `/destinations`;
*/
