import { Routes, Route } from "react-router-dom";
import { Splash, Shop, Home } from "./pages";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {Provider} from "./context"

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
