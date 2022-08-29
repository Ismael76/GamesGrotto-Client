import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios"


export default function CommentModal({ post, closeModal }) {

    const [commentData, setCommentData] = useState([]);

    useEffect(async () => {
        try {
            const url = `http://localhost:5000/comments/${post.id}`
            const data = await axios.get(url)
            setCommentData(data.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const currentPost = () =>
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

    const renderComments = () =>
        commentData.map((item) => (
            <>
                <div>
                    <p className="p-3">{item.text}</p>
                    <p className="p-3 text-center">
                        Commented by {item.username} {/*on {item.date} */}
                    </p>
                </div>
                <hr className="golden" />
            </>
        ))

    return (
        <section className="rpgui-container framed d-flex flex-column text-center">
            <a href="#" onClick={closeModal}><div class="position-absolute">X</div></a>
            {currentPost()}
            {commentData.length !=0 && renderComments()}
        </section>
    );
}
