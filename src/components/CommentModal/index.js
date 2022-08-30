import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function CommentModal({ post, closeModal }) {
  const [commentData, setCommentData] = useState([]);
  const [postCommentData, setPostCommentData] = useState({
    post_id: post.id,
    text: "",
    username: localStorage.getItem("username"),
  });

  const comments = async () => {
    try {
      const url = `http://localhost:5000/comments/${post.id}`;
      const data = await axios.get(url);
      setCommentData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    comments();
  }, []);

  const currentPost = () => (
    <>
      <div>
        <h3 className="p-3">{post.title}</h3>
        <p className="p-3">{post.text}</p>
        <p className="p-3 text-center">
          Posted by {post.username} {/*on {item.date} */}
        </p>
      </div>
      <hr className="golden" />
    </>
  );

  const renderComments = () =>
    commentData.map((item) => (
      <>
        <div>
          <p className="p-3">{item.text}</p>
          <p className="p-3 text-center">
            Commented by {item.username} {/*on {item.date} */}
          </p>
          <div className="d-flex justify-content-around">
            <button className="rpgui-button" onClick={() => updateLikes(item)}>
              {item.likes}👍
            </button>
            <button
              className="rpgui-button"
              onClick={() => updateDislikes(item)}
            >
              {item.dislikes}👎
            </button>
          </div>
        </div>
        <hr className="golden" />
      </>
    ));

  const submitComment = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postCommentData),
    };

    try {
      const response = await fetch("http://localhost:5000/comments/", options);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
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
      const response = await fetch("http://localhost:5000/comments/", options);
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
      const response = await fetch("http://localhost:5000/comments/", options);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="rpgui-container framed d-flex flex-column text-center comments-modal">
      <a href="#" onClick={closeModal}>
        <div className="position-absolute">X</div>
      </a>
      {currentPost()}
      <form onSubmit={(e) => submitComment(e)}>
        <textarea
          required
          placeholder="Enter comment"
          onChange={(e) =>
            setPostCommentData((prev) => ({
              ...prev,
              text: e.target.value,
            }))
          }
        ></textarea>
        <button className="rpgui-button framed-golden">Submit Comment</button>
      </form>
      {commentData.length != 0 && renderComments()}
    </section>
  );
}
