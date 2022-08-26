import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useInterval } from "../../useInterval";

export default function Dashboard() {
  const canvasRef = useRef();

  //Move Character
  const moveCharacter = (e) => {
    if (playerCollision(char, shop)) {
      useNav;
    }

    window.addEventListener(
      "keydown",
      function (e) {
        char.moving = true;
        keysDown[e.keyCode] = true;
      },
      false
    );

    window.addEventListener(
      "keyup",
      function (e) {
        char.moving = false;
        delete keysDown[e.keyCode];
      },
      false
    );
  };

  //Character Model
  let char = {
    x: 230, //Character X Position On Map
    y: 400, //Character Y Position On Map
    width: 20,
    height: 42,
    spriteX: 74, //Position Character Is Facing
    spriteY: 0,
    speed: 150,
    edgeRegion: 50,
    moving: false,
    animateTime: 2,
    animateCur: 0,
    animatePos: Array(0, 42, 84, 42, 0, 128, 170, 128),
  };
  let charReady = false;
  let charImg = new Image();
  charImg.onload = function () {
    charReady = true;
  };
  charImg.src =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/knightd25b8b7e.png";

  //Background Map
  let background = { x: 0, y: 0, width: 512, height: 480 };
  let backgroundReady = false;
  let backgroundImg = new Image();
  backgroundImg.onload = function () {
    backgroundReady = true;
  };
  backgroundImg.src =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/background.png";

  //Shop
  let shop = { x: 100, y: 100, width: 50, height: 50 };
  let shopReady = false;
  let shopImg = new Image(1, 1);
  shopImg.onload = function () {
    shopReady = true;
  };
  shopImg.src =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1eb6c9aa-2543-4b4b-882d-63a35c351c43/d59ekov-7d6c7582-a16c-4a60-ba95-e105a8b7ad27.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFlYjZjOWFhLTI1NDMtNGI0Yi04ODJkLTYzYTM1YzM1MWM0M1wvZDU5ZWtvdi03ZDZjNzU4Mi1hMTZjLTRhNjAtYmE5NS1lMTA1YThiN2FkMjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.DSkRaR9tHFnhuAOwLkT_fk1cm5zBIJXAqSGNJAhPcpw";

  //Render Character & Map & Other Objects Onto Map
  let render = function () {
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

    ctx.drawImage(shopImg, 1, 1);

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

  function playerCollision(a, b) {
    if (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    )
      return true;
    return false;
  }

  // Keyboard Controls To Move Character
  let keysDown = {};

  //Update Character Movement
  let update = function (modifier) {
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

  let then = Date.now();

  (function () {
    let requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  let mainInterval = function () {
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;
    requestAnimationFrame(mainInterval);
  };

  useEffect(() => {
    render();
    mainInterval();
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
      <img src={shopImg}></img>
    </div>
  );
}

