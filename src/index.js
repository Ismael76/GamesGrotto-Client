import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import GameProvider from "./ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GameProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </GameProvider>
);
