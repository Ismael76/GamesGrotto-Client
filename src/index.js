import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import GameProvider from "./ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

//Removed ReactStrict Mode As It Fires Event Twice!
root.render(
  <GameProvider>
    <Router>
      <App />
    </Router>
  </GameProvider>
);
