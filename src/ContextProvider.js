import React, { createContext, useState } from "react";

export const GameContext = createContext();

export default function GameProvider(props) {
  const [leaveShop, setLeaveShop] = useState(false);
  const [leaveForum, setLeaveForum] = useState(false);
  const [offset, setOffset] = useState({ x: -900, y: -1250 });
  const [leaveDungeon, setleaveDungeon] = useState(false);

  return (
    <GameContext.Provider
      value={[
        leaveShop,
        setLeaveShop,
        leaveForum,
        setLeaveForum,
        offset,
        setOffset,
        leaveDungeon,
        setleaveDungeon,
      ]}
    >
      {props.children}
    </GameContext.Provider>
  );
}
