import React, { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  //Character Movement Directions
  const DIRECTIONS = {
    38: [0, -1], //Up
    40: [0, 1], //Down
    37: [-1, 0], //Left
    39: [1, 0], //Right
  };

  const USER_START = [
    [8, 7],
    [8, 8],
  ];

  //Direction of moving character, initially set to move upwards
  const [dir, setDir] = useState([0, -1]);
  const [user, setUser] = useState(USER_START);

  //Gets value of canvas element inside of the canvasRef variable
  const canvasRef = useRef();

  //Moves character
  const moveCharacter = ({ keyCode }) => {
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };

  //Loads character
  useEffect(() => {
    const canvas = canvasRef.current;
    var background = new Image();
    // background.src =
    //   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/background.png";
    const ctx = canvas.getContext("2d");
    // background.onload = () => {
    //   ctx.drawImage(background, 0, 0);
    // };

    ctx.fillStyle = "blue";
    ctx.fillRect(100, 100, 20, 20);
  }, []);

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(e) => moveCharacter(e)}
      className="dashboard"
    >
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={510}
        height={480}
      ></canvas>
    </div>
  );
}
