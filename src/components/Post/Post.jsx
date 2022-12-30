import React from "react";
import { capitilizeFirstLetter } from "../../utils/capitilizeFirstLetter";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../store/post";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { selectArePostsLoading } from "../../store/post/selectors";
import { CommentCreator } from "../CommentCreator/CommentCreator";

export const Post = ({ post, editingOption = true }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletePostOnClick = (event) => {
    event.preventDefault();
    dispatch(deletePost(post.id));
    navigate("/posts", { replace: true });
  };

  const quitPostOnClick = () => {
    setEditing(!editing);
  };

  const updatePostOnClick = () => {
    setEditing(!editing);
  };

  const savePostOnClick = (event) => {
    const editablePost = event.target.closest("div");
    const firstTextarea = editablePost.children[2];
    const secondTextarea = editablePost.children[4];

    dispatch(
      updatePost({
        id: post.id,
        changes: {
          title: firstTextarea.value,
          body: secondTextarea.value,
        },
      })
    );
  };

  return (
    <div
      className={
        editingOption ? `${styles.post} ${styles.editing}` : styles.post
      }
    >
      {editingOption ? (
        <>
          <span className={styles.panel}>
            {editing ? (
              <>
                <MdIcons.MdOutlineExitToApp
                  onClick={(event) => quitPostOnClick(event)}
                  className={styles.quit}
                />
                <MdIcons.MdOutlineSaveAlt
                  onClick={(event) => savePostOnClick(event)}
                  className={styles.save}
                />
              </>
            ) : (
              <HiIcons.HiOutlinePencilAlt
                onClick={(event) => updatePostOnClick(event)}
                className={styles.update}
              />
            )}
            <RiIcons.RiDeleteBinLine
              onClick={(event) => deletePostOnClick(event)}
              className={styles.delete}
            />
          </span>
          <hr className={styles.separator}></hr>
        </>
      ) : (
        ""
      )}
      {editing ? (
        <textarea
          className={styles.textareaTitle}
          defaultValue={post.title}
        ></textarea>
      ) : (
        <h1 className={styles.postTitle}>
          {capitilizeFirstLetter(post.title)}
        </h1>
      )}
      <hr className={styles.separator}></hr>
      {editing ? (
        <textarea
          className={styles.textareaBody}
          defaultValue={post.body}
        ></textarea>
      ) : (
        <p className={styles.postText}>{capitilizeFirstLetter(post.body)}</p>
      )}
      <div className={styles.hidden}>
        <FiIcons.FiMousePointer />
      </div>
    </div>
  );
};
