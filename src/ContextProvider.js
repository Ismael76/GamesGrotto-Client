import React, { createContext, useState, useRef } from "react";

export const GameContext = createContext();

export default function GameProvider(props) {
  const section = useRef();
  const modal = useRef();
  const homeSection = useRef();

  return (
    <GameContext.Provider value={[section, modal, homeSection]}>
      {props.children}
    </GameContext.Provider>
  );
}
