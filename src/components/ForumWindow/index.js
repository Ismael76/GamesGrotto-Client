import React, { useContext } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";

export default function ForumWindow() {
  const [
    section,
    modal,
    homeSection,
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
  ] = useContext(GameContext);

  const navigate = useNavigate();

  const dummyData = [
    {
      id: 1,
      heading: "Hello Gamers",
      content:
        " I tried to get some Pikachus to get on a bus the other day. It was tough, in the end I had to poke em on.",
      username: "Bob",
      date: "12/03/2022",
    },
    {
      id: 2,
      heading: "Hello World",
      content: "Hi guys",
      username: "Billy",
      date: "12/03/2022",
    },
    {
      id: 3,
      heading: "How do I access the shop?",
      content:
        "Playing Tetris has taught me an extremely valuable life lesson. If you fit in, you're going to disappear.",
      username: "Bob",
      date: "12/03/2022",
    },
    {
      id: 4,
      heading: "Hello Gamers",
      content:
        " Garbage men are the best team mates. They're used to carrying trash.",
      username: "Bob",
      date: "12/03/2022",
    },
    {
      id: 5,
      heading: "Hello Gamers",
      content:
        "My friend was so angry when he lost at the video game we were playing, that he smashed up his keyboard. He definitely lost Control.",
      username: "Bob",
      date: "12/03/2022",
    },
    {
      id: 6,
      heading: "Hello Gamers",
      content:
        "A botanist was playing Minecraft, and had to become a math teacher. He needed to calculate the cubic root.  ",
      username: "Bob",
      date: "12/03/2022",
    },
    {
      id: 7,
      heading: "Hello Gamers",
      content:
        "I started making fun of the official Minecraft twitter account last week. I was gutted when they blocked me.",
      username: "Bob",
      date: "12/03/2022",
    },
    {
      id: 8,
      heading: "Hello Gamers",
      content: "I asked a French man if he played video games. He said Wii.",
      username: "Bob",
      date: "12/03/2022",
    },
  ];

  const renderListing = () =>
    dummyData.map((item) => (
      <>
        <li key={item.id}>
          <h3 className="p-3">{item.heading}</h3>
          <p className="p-3">{item.content}</p>
          <p className="p-3 text-center">
            Posted by {item.username} on {item.date}
          </p>
        </li>
        <hr className="golden" />
      </>
    ));

  const handleSubmit = () => {
    console.log("SUBMIT");
  };

  function handleBack() {
    navigate("/home", { replace: true });
    setLeaveForum(true);
    setLeaveShop(false);
  }

  return (
    <section className="rpgui-content">
      <div className="rpgui-container framed-golden forum-search">
        <a href="#" onClick={handleBack}>
          <div class="rpgui-container flex-item">Back</div>
        </a>
        <form onSubmit={handleSubmit} className="d-flex mt-4">
          <input className="m-1" value="Search game here"></input>
          <button className="m-1">Submit</button>
        </form>
      </div>

      <div className="rpgui-container framed-golden forum-window">
        {/*     
        <h1>Take me far away from the mucky muck</h1>
        <hr className="golden"/>
        <h1>To a castle made of clouds</h1> */}
        <h1>Forum Board</h1>
        <hr className="golden" />
        <ul>{renderListing()}</ul>
      </div>
    </section>
  );
}
