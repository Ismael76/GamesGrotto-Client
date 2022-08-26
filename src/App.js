import { Routes, Route } from "react-router-dom";
import { Splash, Shop, Home } from "./pages";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
