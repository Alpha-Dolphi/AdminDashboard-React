import React from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/comment";
import "./styles.css";

export const CommentCreator = ({ post }) => {
  const dispatch = useDispatch();
  const email = "somedude@mail.com";
  const name = "Peter Potkins";

  const saveCommentOnClick = (event) => {
    const comment = event.target.closest("div");
    const textarea = comment.childNodes[1];
    const id = Math.floor(Math.random() * (10000 - 1000) + 1000);

    dispatch(
      addComment({
        id: id,
        data: {
          body: textarea.value,
          email: email,
          name: name,
          id: id,
          postId: post.id,
        },
      })
    );
  };

  return (
    <div className="comment-creator">
      <div className="author">
        <div className="rect">
          {" "}
          <p>
            by <b>{name}</b>
          </p>
        </div>
        <div className="rect">{email}</div>
      </div>
      <textarea className="textarea" cols="30" rows="10"></textarea>
      <button onClick={saveCommentOnClick}>Save</button>
    </div>
  );
};
