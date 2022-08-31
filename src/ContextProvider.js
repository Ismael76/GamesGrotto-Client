import React, { createContext, useState } from "react";

export const GameContext = createContext();

export default function GameProvider(props) {
  const [leaveShop, setLeaveShop] = useState(false);
  const [leaveForum, setLeaveForum] = useState(false);
  const [offset, setOffset] = useState({ x: -280, y: -1250 });

  return (
    <GameContext.Provider
      value={[
        leaveShop,
        setLeaveShop,
        leaveForum,
        setLeaveForum,
        offset,
        setOffset,
      ]}
    >
      {props.children}
    </GameContext.Provider>
  );
}
