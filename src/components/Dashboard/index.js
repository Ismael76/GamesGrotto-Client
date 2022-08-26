import React, { useState, useEffect, useRef } from "react";
import { useInterval } from "../../useInterval";

export default function Dashboard() {
  //Character Movement Directions
  const DIRECTIONS = {
    38: [0, -1], //Up
    40: [0, 1], //Down
    37: [-1, 0], //Left
    39: [1, 0], //Right
  };

  const USER_START = [
    [200, 200],
    [200, 200],
  ];

  //Direction of moving character, initially set to move upwards
  const [dir, setDir] = useState([0, -1]);
  const [user, setUser] = useState(USER_START);
  const [keyPress, setKeyPress] = useState(false);

  //Gets value of canvas element inside of the canvasRef variable
  const canvasRef = useRef();

  //Moves character
  const moveCharacter = ({ keyCode }) => {
    console.log("PRESS KEY");
    setDir(DIRECTIONS[keyCode]);
    setKeyPress(true);
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
    user.forEach(([x, y]) => ctx.fillRect(x, y, 20, 20));
  }, [user]);

  // Char
  var char = {
    x: 50,
    y: 50,
    width: 20,
    height: 42,
    spriteX: 0,
    spriteY: 0,
    speed: 150,
    edgeRegion: 50,
    moving: false,
    animateTime: 2,
    animateCur: 0,
    animatePos: Array(0, 42, 84, 42, 0, 128, 170, 128),
  };
  var charReady = false;
  var charImg = new Image();
  charImg.onload = function () {
    charReady = true;
  };

  charImg.src =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/knightd25b8b7e.png";

  const gameLoop = () => {
    const userCopy = JSON.parse(JSON.stringify(user));
    const newUserHead = [userCopy[0][0] + dir[0], userCopy[0][1] + dir[1]];
    userCopy.unshift(newUserHead);
    userCopy.pop();
    setUser(userCopy);
  };

  //   useInterval(() => gameLoop(), 1000);

  // Background
  var background = { x: 0, y: 0, width: 512, height: 480 };
  var backgroundReady = false;
  var backgroundImg = new Image();
  backgroundImg.onload = function () {
    backgroundReady = true;
  };
  backgroundImg.src =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/background.png";

  // Render Function
  var render = function () {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 512, 480);

    if (char.moving) {
      if (char.animateTime > 0) {
        char.animateTime--;
      } else {
        if (char.animateCur + 1 < char.animatePos.length) {
          char.animateCur++;
          char.spriteY = char.animatePos[char.animateCur];
        } else {
          char.animateCur = 0;
          char.spriteY = char.animatePos[0];
        }
        char.animateTime = 2;
      }
    }

    if (backgroundReady) {
      ctx.drawImage(backgroundImg, background.x, background.y);
    }

    if (charReady) {
      ctx.drawImage(
        charImg,
        char.spriteX,
        char.spriteY,
        char.width,
        char.height,
        char.x,
        char.y,
        char.width,
        char.height
      );
    }
  };

  // Keyboard controls
  var keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      char.moving = true;
      keysDown[e.keyCode] = true;
    },
    false
  );

  addEventListener(
    "keyup",
    function (e) {
      char.moving = false;
      delete keysDown[e.keyCode];
    },
    false
  );

  // Update
  var update = function (modifier) {
    if (37 in keysDown) {
      char.spriteX = 170;
      if (Math.round(char.x) > char.edgeRegion) {
        char.x -= char.speed * modifier;
      } else {
        if (Math.round(background.x) < 0) {
          background.x += char.speed * modifier;
        } else if (Math.round(char.x) > 0) {
          char.x -= char.speed * modifier;
        }
      }
    }
    if (38 in keysDown) {
      char.spriteX = 74;
      if (Math.round(char.y) > char.edgeRegion) {
        char.y -= char.speed * modifier;
      } else {
        if (Math.round(background.y) < 0) {
          background.y += char.speed * modifier;
        } else if (Math.round(char.y) > 0) {
          char.y -= char.speed * modifier;
        }
      }
    }
    if (39 in keysDown) {
      char.spriteX = 148;
      if (Math.round(char.x) + char.width < 512 - char.edgeRegion) {
        char.x += char.speed * modifier;
      } else {
        if (Math.round(background.x) > 512 - background.width) {
          background.x -= char.speed * modifier;
        } else if (Math.round(char.x) + char.width < 512) {
          char.x += char.speed * modifier;
        }
      }
    }
    if (40 in keysDown) {
      char.spriteX = 0;
      if (Math.round(char.y) + char.height < 480 - char.edgeRegion) {
        char.y += char.speed * modifier;
      } else {
        if (Math.round(background.y) > 480 - background.height) {
          background.y -= char.speed * modifier;
        } else if (Math.round(char.y) + char.height < 480) {
          char.y += char.speed * modifier;
        }
      }
    }

    if (37 in keysDown && 38 in keysDown) {
      char.spriteX = 124;
    }
    if (38 in keysDown && 39 in keysDown) {
      char.spriteX = 100;
    }
    if (39 in keysDown && 40 in keysDown) {
      char.spriteX = 50;
    }
    if (40 in keysDown && 37 in keysDown) {
      char.spriteX = 26;
    }
  };

  useEffect(() => {
    render();
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
