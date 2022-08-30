import React, { createContext, useState } from "react";

export const GameContext = createContext();

export default function GameProvider(props) {
  const [leaveShop, setLeaveShop] = useState(false);
  const [leaveForum, setLeaveForum] = useState(false);

  return (
    <GameContext.Provider
      value={[leaveShop, setLeaveShop, leaveForum, setLeaveForum]}
    >
      {props.children}
    </GameContext.Provider>
  );
}
