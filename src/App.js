import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components";
import { Splash } from "./pages";

import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Splash />} />

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

    </Routes>
  );
}

export default App;
