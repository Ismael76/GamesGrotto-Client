import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { GameContext } from "../../ContextProvider";

export default function RunnerGame() {
  const [
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
    offset,
    setOffset,
    leaveDungeon,
    setleaveDungeon,
  ] = useContext(GameContext);
  const [score, setScore] = useState(0);
  const [gameLoop, setGameLoop] = useState("before");
  const navigate = useNavigate();
  const count = useRef(0);

  useEffect(() => {
    const character = document.getElementById("character");
    const hazard = document.querySelector(".slime");

    function jump() {
      if (character.classList != "jump") {
        character.classList.add("jump");

        setTimeout(function () {
          character.classList.remove("jump");
        }, 500);
      }
    }

    let isAlive = setInterval(function () {
      // get current character Y position
      let characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      let hazardLeft;
      if (hazard.id == "block") {
        // get current hazard X position
        hazardLeft = parseInt(
          window.getComputedStyle(hazard).getPropertyValue("left")
        );
      }

      // detect collision
      if (hazardLeft < 40 && hazardLeft > 0 && characterTop > 175) {
        // collision
        hazard.id = "";
        let finalScore = count.current;
        updateScore(finalScore);
      }
    }, 10);

    const title = document.querySelector(".instructions");
    document.addEventListener("keydown", function (event) {
      if (gameLoop == "before") {
        title.id = "startedTitle";
        hazard.id = "block";
        setGameLoop("started");
      } else if (gameLoop == "started") {
        jump();
      }
    });
  }, [gameLoop]);

  var tID; //we will use this variable to clear the setInterval()
  function animateScript() {
    var position = 48; //start position for the image slicer
    const interval = 100; //100 ms of interval for the setInterval()
    tID = setInterval(() => {
      document.getElementById(
        "character"
      ).style.backgroundPosition = `-${position}px 0px`;
      //we use the ES6 template literal to insert the variable "position"
      if (position < 144) {
        position = position + 48;
      }
      //we increment the position by 256 each time
      else {
        position = 48;
      }
      //reset the position to 256px, once position exceeds 1536px
    }, interval); //end of setInterval
  }

  async function updateScore(finalScore) {
    console.log(finalScore);
    const data = (await axios.get("http://localhost:5000/scores/")).data;
    const scoreNumber = data.length;
    if (scoreNumber < 10) {
      const scoreData = {
        username: localStorage.getItem("username"),
        score: finalScore,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scoreData),
      };
      try {
        const response = await fetch("http://localhost:5000/scores/", options);
        const data = await response.json();
        setGameLoop("ended");
        return data;
      } catch (err) {
        console.log(err);
      }
    } else {
      const scoreData = {
        username: localStorage.getItem("username"),
        score: finalScore,
      };
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scoreData),
      };
      try {
        const response = await fetch("http://localhost:5000/scores/", options);
        const data = await response.json();
        setGameLoop("ended");
        return data;
      } catch (err) {
        console.log(err);
      }
    }
    // navigate("/home", { replace: true });
  }

  function addScore() {
    setScore((prev) => prev + 1);
    count.current = count.current + 1;
  }
  useEffect(() => {
    if (gameLoop == "started") {
      const countDown = setInterval(() => addScore(), 1000);
      animateScript();
      return () => clearInterval(countDown);
    } else if (gameLoop == "ended") {
      alert("Game Over");
      setLeaveForum(false);
      setLeaveShop(false);
      setleaveDungeon(true);
      setOffset({
        x: -2100,
        y: -1850,
      });

      navigate("/home", { replace: true });
    }
  }, [gameLoop]);

  return (
    <>
      <div className="gameBackground">
        <h1 id="before" className="instructions">
          Press Any Button To Start Game!
        </h1>
        <section className="gameCanvas">
          <div id="game">
            <div id="character"></div>
            <div id="" className="slime"></div>
          </div>
          <h1 id="score">{score}</h1>
        </section>
      </div>
    </>
  );
}
