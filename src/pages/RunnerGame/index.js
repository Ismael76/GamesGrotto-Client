import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import kirby from "./kirby.png"

export default function RunnerGame() {
    const [score, setScore] = useState(0)

    useEffect(() => {
        let character = document.getElementById("character");
        document.addEventListener("click", jump);
        function jump() {
            if (character.classList == "animate") { return; }
            character.classList.add("animate");
            setTimeout(removeJump, 300);
        };
        function removeJump() {
            character.classList.remove("animate");
        }
    
        let block = document.getElementById("block");
        function checkDead() {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
                alert("Game over");
            }
        }

    
        setInterval(checkDead, 10);
        
    }, []);

    function addScore(){
        setScore(score+1)
    }
    setInterval(addScore, 1000);
    return (
        <>
        <div id="game">
            <img src={kirby} id="character" alt="broken" />
            <div id="block"></div>
        </div>
        <h1 id="score">{score}</h1>
        </>
    );
}
