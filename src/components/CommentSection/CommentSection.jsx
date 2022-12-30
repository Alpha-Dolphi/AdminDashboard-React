import React from "react";
import { useState } from "react";
import { capitilizeFirstLetter } from "../../utils/capitilizeFirstLetter";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import "./styles.css";
import { deleteComment, updateComment } from "../../store/comment";
import { useDispatch } from "react-redux";

export const CommentSection = ({ postComments }) => {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(postComments.map((comment) => false));

  const quitCommentOnClick = (event) => {
    const comment = event.target.closest("div");

    setEditing(
      editing.map((edit, index) =>
        index === Number(comment.id) ? !edit : edit
      )
    );
  };

  const deleteCommentOnClick = async (event) => {
    event.preventDefault();

    const comment = event.target.closest("div");

    dispatch(deleteComment(comment.dataset.key));
  };

  const updateCommentOnClick = (event) => {
    const comment = event.target.closest("div");

    setEditing(
      editing.map((edit, index) =>
        index === Number(comment.id) ? !edit : edit
      )
    );
  };

  const saveCommentOnClick = (event) => {
    const comment = event.target.closest("div");

    const textarea = comment.childNodes[2].firstChild;

    dispatch(
      updateComment({
        id: comment.dataset.key,
        changes: {
          body: textarea.value,
        },
      })
    );
  };

  return (
    <div className="comments-wrap">
      {postComments.map((comment, index) => {
        return (
          <div
            key={comment.id}
            id={index}
            data-key={comment.id}
            className="comment"
          >
            <span className="panel">
              {editing[index] ? (
                <>
                  <MdIcons.MdOutlineExitToApp
                    onClick={(event) => quitCommentOnClick(event)}
                    className="quit"
                  />
                  <MdIcons.MdOutlineSaveAlt
                    onClick={(event) => saveCommentOnClick(event)}
                    className="save"
                  />
                </>
              ) : (
                <HiIcons.HiOutlinePencilAlt
                  onClick={(event) => updateCommentOnClick(event)}
                  className="update"
                />
              )}
              <RiIcons.RiDeleteBinLine
                onClick={(event) => deleteCommentOnClick(event)}
                className="delete"
              />
            </span>
            <div className="author">
              <div className="rect">
                {" "}
                <p>
                  by <b>{capitilizeFirstLetter(comment.name)}</b>
                </p>
              </div>
              <div className="rect">{comment.email}</div>
            </div>
            {editing[index] ? (
              <div className="textarea-wrap">
                <textarea
                  className="textarea"
                  defaultValue={comment.body}
                ></textarea>
              </div>
            ) : (
              <div className="commentBody">
                {capitilizeFirstLetter(comment.body)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
