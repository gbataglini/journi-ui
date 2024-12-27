import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const auth = useAuth();
  return (
    <div>
      <Navbar />

      <h3>Welcome Back,</h3>
      <h2>
        {" "}
        {auth.user?.firstName} {auth.user?.lastName}
      </h2>
    </div>
  );
}

export default Home;
