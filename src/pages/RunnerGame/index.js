import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import kirby from "./kirby.png"
import axios from "axios"

export default function RunnerGame() {
    const [score, setScore] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const countDown = setInterval(()=>addScore(), 1000)
        return () => clearInterval(countDown)
    }, [])

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

        async function updateScore(points){
            // console.log(points)
            const data = (await axios.get("http://localhost:5000/scores/")).data
            const scoreNumber = data.length
            if (scoreNumber < 10){
                const scoreData = {username:localStorage.getItem("username"), score:score}
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(scoreData),
                  };
                  try {
                    const response = await fetch("http://localhost:5000/scores/", options);
                    const data = await response.json();
                    return data;
                  } catch (err) {
                    console.log(err);
                  }
             } else {
                const scoreData = {username:localStorage.getItem("username"), score:score}
                const options = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(scoreData),
                };
                try {
                    const response = await fetch("http://localhost:5000/scores/", options);
                    const data = await response.json();
                    return data;
                } catch (err) {
                    console.log(err);
                }
            }
            navigate("/home", { replace: true });
        }
    
        let block = document.getElementById("block");
        function checkDead() {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
                block.id = ""
                updateScore(score);
            }
        }

    
        setInterval(checkDead, 10);
        
    }, []);

    function addScore(){
        setScore(score +1)
    }
  

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
