import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Modal from "react-modal";
import CommentModal from "../CommentModal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    opacity: "1",
  },
};
Modal.setAppElement("#root");

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
  const [postData, setPostData] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState();

  useEffect(async () =>{
    try {
      const url = "http://localhost:5000/posts"
      const data = await axios.get(url)
      setPostData(data.data)
    } catch(error) {
      console.log(error)
    }
  }, [])

  const openModal = (post) => {
    setPost(post)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  
  const renderListing = () =>
    postData.map((item) => (
      <>
        <div key={item.id} onClick={() =>openModal(item)}>
          <h3 className="p-3">{item.title}</h3>
          <p className="p-3">{item.text}</p>
          <p className="p-3 text-center">
             Posted by {item.username} {/*on {item.date} */}
          </p>
        </div>
        <hr className="golden" />
      </>
    ));

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("SUBMIT");
  };

  function handleBack() {
    navigate("/home", { replace: true });
    setLeaveForum(true);
    setLeaveShop(false);
  }

  return (
    <section className="rpgui-content">
      {!modalIsOpen && <>
      <div className="rpgui-container framed-golden forum-search">
        <a href="#" onClick={handleBack}>
          <div className="rpgui-container flex-item">Back</div>
        </a>
        <form onSubmit={handleSubmit} className="d-flex mt-4">
          <input className="m-1" placeholder="Search title here"></input>
          <button className="m-1">Submit</button>
        </form>
      </div>

      <div className="rpgui-container framed-golden forum-window">
        <h1>Forum Board</h1>
        <hr className="golden" />
        {postData.length ==0 && <h1>No Posts Available</h1>}
        {postData.length !=0 && <ul>{renderListing()}</ul>}
      </div>
      </>}
      {modalIsOpen && <>
      <Modal
        className="rpgui-content splash-modal-position"
        ref={modal}
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Authentication modal"
      ></Modal>
      <div className="rpgui-container framed d-flex flex-column text-center listing-modal">
        <CommentModal post={post} closeModal={closeModal} />
      </div>
      </>}
    </section>
  );
}
