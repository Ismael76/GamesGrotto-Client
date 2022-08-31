import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { collisions } from "./collisions";
import {
  shopNavigateData,
  forumNavigateData,
  shopPopupData,
  aboutPopupData,
  minigamePopupData,
  minigameNavigateData,
  leaderboardPopupData,
  navigateWebsiteData,
} from "./navigateZones";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal";
import { GameContext } from "../../ContextProvider";

//Array That Stores All Tiles That Is A Collision Tile
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, 50 + i));
}

//Array That Stores All Tiles That Trigger A Navigation To Shop
const shopNavigate = [];
for (let i = 0; i < shopNavigateData.length; i += 50) {
  shopNavigate.push(shopNavigateData.slice(i, 50 + i));
}

//Array That Stores All Tiles That Trigger A Navigation To Forums
const forumNavigate = [];
for (let i = 0; i < forumNavigateData.length; i += 50) {
  forumNavigate.push(forumNavigateData.slice(i, 50 + i));
}

//Array That Stores All Tiles That Trigger The Minigame
const minigameNavigate = [];
for (let i = 0; i < minigameNavigateData.length; i += 50) {
  minigameNavigate.push(minigameNavigateData.slice(i, 50 + i));
}

const websiteNavigate = [];
for (let i = 0; i < navigateWebsiteData.length; i += 50) {
  websiteNavigate.push(navigateWebsiteData.slice(i, 50 + i));
}

//Array That Stores All Tiles That Trigger Signboard Modal Popup For Shop
const shopPopup = [];
for (let i = 0; i < shopPopupData.length; i += 50) {
  shopPopup.push(shopPopupData.slice(i, 50 + i));
}

const aboutPopup = [];
for (let i = 0; i < aboutPopupData.length; i += 50) {
  aboutPopup.push(aboutPopupData.slice(i, 50 + i));
}

//Array That Stores All Tiles That Trigger Signboard Modal Popup For Forum
const minigamePopup = [];
for (let i = 0; i < minigamePopupData.length; i += 50) {
  minigamePopup.push(minigamePopupData.slice(i, 50 + i));
}

const leaderboardPopup = [];
for (let i = 0; i < leaderboardPopupData.length; i += 50) {
  leaderboardPopup.push(leaderboardPopupData.slice(i, 50 + i));
}

const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  W: {
    pressed: false,
  },
  A: {
    pressed: false,
  },
  S: {
    pressed: false,
  },
  D: {
    pressed: false,
  },
};

let lastKeyDown = "";
document.addEventListener("keydown", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKeyDown = "ArrowUp";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKeyDown = "ArrowDown";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKeyDown = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKeyDown = "ArrowRight";
      break;
    case "w":
      keys.w.pressed = true;
      lastKeyDown = "ArrowUp";
      break;
    case "s":
      keys.s.pressed = true;
      lastKeyDown = "ArrowDown";
      break;
    case "a":
      keys.a.pressed = true;
      lastKeyDown = "ArrowLeft";
      break;
    case "d":
      keys.d.pressed = true;
      lastKeyDown = "ArrowRight";
      break;
    case "W":
      keys.W.pressed = false;
      break;
    case "S":
      keys.S.pressed = false;
      break;
    case "A":
      keys.A.pressed = false;
      break;
    case "D":
      keys.D.pressed = false;
      break;
    default:
      break;
  }
});
document.addEventListener("keyup", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "W":
      keys.W.pressed = false;
      break;
    case "S":
      keys.S.pressed = false;
      break;
    case "A":
      keys.A.pressed = false;
      break;
    case "D":
      keys.D.pressed = false;
      break;
    default:
      break;
  }
});

const Dashboard = ({ draw, height, width }) => {
  const [
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
    offset,
    setOffset,
  ] = useContext(GameContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [whichModal, setWhichModal] = React.useState("");
  const canvas = React.useRef();

  const navigate = useNavigate();

  React.useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    //Getting Player Image To Render On Map
    let playerImage = new Image();
    playerImage.src = require("../../images/playerUp.png");

    let playerImageDown = new Image();
    playerImageDown.src = require("../../images/playerDown.png");

    let playerImageRight = new Image();
    playerImageRight.src = require("../../images/playerRight.png");

    let playerImageLeft = new Image();
    playerImageLeft.src = require("../../images/playerLeft.png");

    //Boundaries Class Created To Deal With Boundaries Where Players Cant Move Over
    class Boundary {
      static width = 64;
      static height = 64;

      constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    const boundaries = [];

    //All Collision Tiles
    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Shop
    const shopNavigateTiles = [];

    shopNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          shopNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Forum
    const forumNavigateTiles = [];

    forumNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          forumNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Forum
    const minigameNavigateTiles = [];

    minigameNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          minigameNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Shop Signboard
    const shopPopupTiles = [];

    shopPopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          shopPopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const aboutPopupTiles = [];

    aboutPopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          aboutPopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Forum Signboard
    const minigamePopupTiles = [];

    minigamePopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          minigamePopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const leaderboardPopupTiles = [];

    leaderboardPopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          leaderboardPopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const websiteNavigateTiles = [];

    websiteNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          websiteNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //Sprite Class Creating Sprites Such As Players, Map etc.
    class Sprite {
      constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };

        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
        this.moving = false;
        this.sprites = sprites;
      }

      draw() {
        ctx.drawImage(
          this.image,
          this.frames.val * this.width,
          0,
          this.image.width / this.frames.max, //Crop X
          this.image.height, //Crop Y
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );

        if (this.moving) {
          if (this.frames.max > 1) this.frames.elapsed++;

          if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
          }
        }
      }
    }

    let playerPosX = 750;
    let playerPosY = 440;
    let directionPlayerFace = playerImage;

    //If User Leaves Shop Set Position
    if (leaveShop) {
      directionPlayerFace = playerImageDown;
    }

    if (leaveForum) {
      directionPlayerFace = playerImageDown;
    }

    // Player Configuration
    const player = new Sprite({
      position: {
        x: playerPosX, //Player Pos On X Axis
        y: playerPosY, // Player Pos On Y Axis
      },
      image: directionPlayerFace, //Loading Player Image
      frames: {
        max: 4,
      },
      sprites: {
        up: playerImage,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight,
      },
    });

    // Game Scene Configuration
    const gameScene = new Image();
    gameScene.src = require("./map.png");
    console.log(offset.y);
    const gameSceneLayer = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: gameScene, //Loading Map Image
    });

    //Foreground Image
    const gameSceneForegroundImage = new Image();
    gameSceneForegroundImage.src = require("./foregroundObjects.png");
    const gameSceneForegroundLayer = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: gameSceneForegroundImage, //Loading Map Image
    });

    const checkCollision = ({ player, boundary }) => {
      return (
        player.position.x + player.width >= boundary.position.x &&
        player.position.x <= boundary.position.x + boundary.width &&
        player.position.y <= boundary.position.y + boundary.height &&
        player.position.y + player.height >= boundary.position.y
      );
    };

    const moveables = [
      gameSceneLayer,
      ...boundaries,
      gameSceneForegroundLayer,
      ...shopNavigateTiles,
      ...forumNavigateTiles,
      ...minigameNavigateTiles,
      ...shopPopupTiles,
      ...minigamePopupTiles,
      ...aboutPopupTiles,
      ...leaderboardPopupTiles,
      ...websiteNavigateTiles,
    ];

    function animate() {
      const animationID = window.requestAnimationFrame(animate);
      gameSceneLayer.draw(); //Draw Game Map Onto Canvas

      //All Boundaries PLayers Cannot Walk Over
      boundaries.forEach((boundary) => {
        boundary.draw();
      });

      //All Navigation Tiles Players Walk Over To Enter Shop
      shopNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      //All Navigation Tiles Players Walk Over To Enter Forums
      forumNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      minigameNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      websiteNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      //All Navigation Tiles Players Walk Over For Shop Sign Board Popup
      shopPopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      //All Navigation Tiles Players Walk Over For Forum Sign Board Popup
      minigamePopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      aboutPopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      leaderboardPopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      player.draw(); //Draw Player Onto Canvas

      gameSceneForegroundLayer.draw();

      let moving = true;
      player.moving = false;

      if (
        keys.w.pressed ||
        keys.a.pressed ||
        keys.s.pressed ||
        keys.d.pressed ||
        keys.W.pressed ||
        keys.A.pressed ||
        keys.S.pressed ||
        keys.D.pressed ||
        keys.ArrowDown.pressed ||
        keys.ArrowUp.pressed ||
        keys.ArrowLeft.pressed ||
        keys.ArrowRight.pressed
      ) {
        for (let i = 0; i < shopNavigateTiles.length; i++) {
          const navigateZone = shopNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            navigate("/shop", { replace: true });
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < websiteNavigateTiles.length; i++) {
          const navigateZone = websiteNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            window.location.replace("https://www.getfutureproof.co.uk/");
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < aboutPopupTiles.length; i++) {
          const navigateZone = aboutPopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("about");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < leaderboardPopupTiles.length; i++) {
          const navigateZone = leaderboardPopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("leaderboard");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < minigameNavigateTiles.length; i++) {
          const navigateZone = minigameNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            navigate("/game", { replace: true });
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < minigamePopupTiles.length; i++) {
          const navigateZone = minigamePopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("dungeon");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < shopPopupTiles.length; i++) {
          const navigateZone = shopPopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("shop");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < forumNavigateTiles.length; i++) {
          const navigateZone = forumNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            navigate("/forum", { replace: true });
            window.cancelAnimationFrame(animationID);
            break;
          }
        }
      }
      if (
        keys.ArrowDown.pressed ||
        keys.S.pressed ||
        (keys.s.pressed && lastKeyDown === "ArrowDown")
      ) {
        // Player Movement When Keys Are Pressed
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.y -= 3;
          }); // Move Down
        }
      } else if (
        keys.ArrowUp.pressed ||
        keys.W.pressed ||
        (keys.w.pressed && lastKeyDown === "ArrowUp")
      ) {
        playerImageDown = playerImage;
        player.image = playerImage;
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        if (moving) {
          moveables.forEach((movable) => {
            movable.position.y += 3;
          }); // Move Up
        }
      } else if (
        keys.ArrowRight.pressed ||
        keys.D.pressed ||
        (keys.d.pressed && lastKeyDown === "ArrowRight")
      ) {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.x -= 3;
          }); // Move Left
        }
      } else if (
        keys.ArrowLeft.pressed ||
        keys.A.pressed ||
        (keys.a.pressed && lastKeyDown === "ArrowLeft")
      ) {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.x += 3;
          }); // Move Right
        }
      }
    }

    animate();
  }, [draw, height, width]);

  return (
    <>
      <canvas ref={canvas} height={height} width={width} />
      <GameModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        whichModal={whichModal}
        setWhichModal={setWhichModal}
      />
    </>
  );
};

Dashboard.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Dashboard;
