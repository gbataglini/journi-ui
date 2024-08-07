import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Button from "./components/ui/Button";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Button
        text="Add Destination"
        onClick={() => console.log("test")}
        buttonColour="coral"
      />
    </div>
  );
}

export default App;
