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
  const [
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
    offset,
    setOffset,
  ] = useContext(GameContext);

  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [post, setPost] = useState();
  const [rerender, setRerender] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [rerenderComments, setRerenderComments] = useState();

  const getPosts = async () => {
    try {
      const url = "https://games-grotto.herokuapp.com/posts";
      const data = await axios.get(url);
      setPostData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    
  }, [rerender]);

  const openCommentModal = (post) => {
    setPost(post);
    setRerenderComments(Math.random())
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

  const updateLikes = async (item, option) => {
    const username = localStorage.getItem("username");
    console.log(username);
    const data = {
      id: item.id,
      username: username,
      option: option,
      likes: item.likes,
      dislikes: item.dislikes,
    };
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(
        "https://games-grotto.herokuapp.com/posts",
        options
      );
      const data = await response.json();
      setRerender(Math.random());
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const renderListing = () =>
    postData
      .filter((searchPost) => {
        if (searchTerm == "") return searchPost;
        else if (
          searchPost.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
          return searchPost;
      })
      .map((item) => (
        <>
          <div key={item.id} onClick={() => openCommentModal(item)}>
            <h3 className="p-3">{item.title}</h3>

            <p className="p-3">{item.text}</p>
            <p className="p-3 text-center">
              Posted by {item.username} {/*on {item.date} */}
            </p>
          </div>
          <div className="d-flex justify-content-around">
            <button
              className="rpgui-button"
              onClick={() => updateLikes(item, "likes")}
            >
              {item.likes.length}👍
            </button>
            <button
              className="rpgui-button"
              onClick={() => updateLikes(item, "dislikes")}
            >
              {item.dislikes.length}👎
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
    setOffset({
      x: -850,
      y: -1100,
    });
  }

  return (
    <section className="rpgui-content">
      {!modalIsOpen && (
        <>
          <div className="rpgui-container framed-golden forum-search">
            <a href="#" onClick={handleBack}>
              <div className="rpgui-container flex-item">Back</div>
            </a>
            <form onSubmit={handleSubmit} className="d-flex mt-4">
              <input
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="m-1"
                placeholder="Search Title Here"
              ></input>
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

      {whichModal == "DisplayComments" && (
        <div className={modalIsOpen ? "show-modal" : "hide-modal"}>
          <div className="modal-content modal-center">
            <CommentModal post={post} closeModal={closeModal} rerenderComments={rerenderComments} setRerenderComments={setRerenderComments}/>
          </div>
        </div>
      )}
      {whichModal == "CreatePost" && (
        <div className={modalIsOpen ? "show-modal" : "hide-modal"}>
          <div className="modal-content modal-center">
            <CreatePostModal setRerender={setRerender} closeModal={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
}
