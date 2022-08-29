import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { GameContext } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CommentModal from "../CommentModal";
import CreatePostModal from "../CreatePostModal";
import { motion } from "framer-motion";

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
  const [leaveShop, setLeaveShop, leaveForum, setLeaveForum] =
    useContext(GameContext);

  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [post, setPost] = useState();

  useEffect(async () => {
    try {
      const url = "http://localhost:5000/posts";
      const data = await axios.get(url);
      setPostData(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openCommentModal = (post) => {
    setPost(post);
    setWhichModal("DisplayComments");
    setIsOpen(true);
  };

  const openCreatePostModal = () => {
    setWhichModal("CreatePost");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateLikes = async (item) => {
    item.likes = item.likes + 1;
    const data = { id: item.id, likes: item.likes, dislikes: item.dislikes };
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("http://localhost:5000/posts", options);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateDislikes = async (item) => {
    item.dislikes = item.dislikes + 1;
    const data = { id: item.id, likes: item.likes, dislikes: item.dislikes };
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("http://localhost:5000/posts", options);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const renderListing = () =>
    postData.map((item) => (
      <>
        <div key={item.id} onClick={() => openCommentModal(item)}>
          <h3 className="p-3">{item.title}</h3>

          <p className="p-3">{item.text}</p>
          <p className="p-3 text-center">
            Posted by {item.username} {/*on {item.date} */}
          </p>
        </div>
        <div className="d-flex justify-content-around">
          <button className="rpgui-button" onClick={() => updateLikes(item)}>
            {item.likes}👍
          </button>
          <button className="rpgui-button" onClick={() => updateDislikes(item)}>
            {item.dislikes}👎
          </button>
        </div>
        <hr className="golden" />
      </>
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function handleBack() {
    navigate("/home", { replace: true });
    setLeaveForum(true);
    setLeaveShop(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <section className="rpgui-content">
        {!modalIsOpen && (
          <>
            <div className="rpgui-container framed-golden forum-search">
              <a href="" onClick={handleBack}>
                <div className="rpgui-container flex-item">Back</div>
              </a>
              <form onSubmit={handleSubmit} className="d-flex mt-4">
                <input className="m-1" placeholder="Search Title Here"></input>
                <button className="m-1">Submit</button>
              </form>
            </div>

            <div className="rpgui-container framed-golden forum-window">
              <h1>Forum Board</h1>
              <hr className="golden" />
              {postData.length == 0 && <h1>No Posts Available</h1>}
              {postData.length != 0 && <ul>{renderListing()}</ul>}
            </div>

            <button
              className="rpgui-container framed-golden post-create"
              onClick={openCreatePostModal}
            >
              Create Post
            </button>
          </>
        )}

        <Modal
          className="rpgui-content splash-modal-position p-3"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Authentication modal"
        >
          {whichModal == "DisplayComments" && (
            <>
              <CommentModal post={post} closeModal={closeModal} />
            </>
          )}
          {whichModal == "CreatePost" && (
            <>
              <CreatePostModal closeModal={closeModal} />
            </>
          )}
        </Modal>
      </section>
    </motion.div>
  );
}
