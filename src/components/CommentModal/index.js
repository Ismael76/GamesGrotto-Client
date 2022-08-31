import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function CommentModal({
  post,
  closeModal,
  rerenderComments,
  setRerenderComments,
}) {
  const [commentData, setCommentData] = useState([]);
  const [postCommentData, setPostCommentData] = useState({
    post_id: post.id,
    text: "",
    username: localStorage.getItem("username"),
    likes: [],
    dislikes: [],
  });

  const [inputVal, setInputVal] = useState("");

  const comments = async () => {
    console.log(post);
    try {
      const url = `http://localhost:5000/comments/${post.id}`;
      const data = await axios.get(url);
      setCommentData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    comments();
  }, [rerenderComments]);

  const currentPost = () => (
    <section className="container pt-4">
      <div className="rpgui-container framed-golden-relative shadow-sm">
        <h3 className="p-3">{post.title}</h3>
        <p className="p-3">{post.text}</p>
        <p className="p-3 text-center">
          Posted by {post.username} {/*on {item.date} */}
        </p>
      </div>
      <hr className="golden" />
    </section>
  );

  const renderComments = () =>
    commentData.map((item) => (
      <>
        <div key={item.id} className="rpgui-container framed-golden2-relative my-3 mx-3 shadow-sm">
          <p className="p-3">{item.text}</p>
          <p className="p-3 text-center">
            Commented by {item.username} {/*on {item.date} */}
          </p>
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
      setCommentData((prev) => [...prev, postCommentData]);
      setInputVal("");
      setRerenderComments(Math.random());
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateLikes = async (item, option) => {
    const username = localStorage.getItem("username");
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
      const response = await fetch("http://localhost:5000/comments/", options);
      const data = await response.json();
      setRerenderComments(Math.random());
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="rpgui-container framed d-flex flex-column text-center comments-modal">
      <a onClick={closeModal}>
        <div className="position-absolute cross">X</div>
      </a>
      {currentPost()}
      <form onSubmit={(e) => submitComment(e)}>
        <div className="rpgui-container framed-relative w-75 mx-auto mb-4" >
        <textarea
        className="bg-dark"
          required
          placeholder="Enter comment"
          onChange={(e) => {
            setPostCommentData((prev) => ({
              ...prev,
              text: e.target.value,
            }));
            setInputVal(e.target.value);
          }}
          value={inputVal}
        ></textarea>
        </div>
        <button className="rpgui-button framed-golden mb-3">Comment</button>
      </form>
      {commentData.length != 0 && renderComments()}
    </section>
  );
}
