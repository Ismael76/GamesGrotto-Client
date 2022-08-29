import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios"


export default function CreatePostModal({ closeModal }) {
    const [postData, setPostData] = useState({
        title: "",
        text: "",
        username: localStorage.getItem("username")
    });

    const submitPost = async (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        };

        try {
            const response = await fetch("http://localhost:5000/posts", options);
            const data = await response.json();
            // closeModal()
            window.location.reload()
            return data;
        } catch (err) {
            console.log(err);
            closeModal()
        }
        
    };

    return (
        <section className="rpgui-container framed d-flex flex-column text-center">
            <a href="" onClick={closeModal}><div className="position-absolute">X</div></a>
            <h1>Create Post</h1>
            <form onSubmit={(e) => submitPost(e)}>
                <input
                    className="mb-1"
                    type="text"
                    label="Title"
                    placeholder="Title"
                    required
                    onChange={(e) =>
                        setPostData((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                />
                <input
                    className="mb-1"
                    type="text"
                    label="Text"
                    placeholder="Text"
                    required
                    onChange={(e) =>
                        setPostData((prev) => ({
                            ...prev,
                            text: e.target.value,
                        }))
                    }
                />
                <button type="submit" className="rpgui-button mb-1">
                    Create Post
                </button>
            </form>
        </section>
    );
}
