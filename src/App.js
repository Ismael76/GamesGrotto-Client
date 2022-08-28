import { Routes, Route } from "react-router-dom";
import { Splash, Shop, Home, Forum } from "./pages";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/shop" element={<Shop />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
      </Route>
      <Route path="/" element={<Splash />} />
    </Routes>
  );
}

export default App;
