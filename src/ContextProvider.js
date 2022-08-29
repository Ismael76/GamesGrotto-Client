import React, { createContext, useState, useRef } from "react";

export const GameContext = createContext();

export default function GameProvider(props) {
  const section = useRef();
  const modal = useRef();
  const homeSection = useRef();
  const [leaveShop, setLeaveShop] = useState(false);
  const [leaveForum, setLeaveForum] = useState(false);

  return (
    <GameContext.Provider
      value={[
        section,
        modal,
        homeSection,
        leaveShop,
        setLeaveShop,
        leaveForum,
        setLeaveForum,
      ]}
    >
      {props.children}
    </GameContext.Provider>
  );
}
