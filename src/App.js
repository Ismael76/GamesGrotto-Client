import { Routes, Route } from "react-router-dom";
import { Splash, Shop, Home, Forum, RunnerGame } from "./pages";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import PrivateRoutes from "./utils/PrivateRoute";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/game" element={<RunnerGame />} />
        </Route>
        <Route path="/" element={<Splash />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
