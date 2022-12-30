import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchComment } from "../../store/comment";
import {
  selectAreCommentsLoading,
  selectCommentsByPostId,
} from "../../store/comment/selectors";
import { fetchPost } from "../../store/post";
import {
  selectArePostsLoading,
  selectPostsById,
} from "../../store/post/selectors";
import { CommentCreator } from "../CommentCreator/CommentCreator";
import { CommentSection } from "../CommentSection/CommentSection";
import { Post } from "../Post/Post";
import "./styles.css";

export const PostPageContent = () => {
  const pathArray = window.location.pathname.split("/");
  const postId = pathArray[pathArray.length - 1];

  const dispatch = useDispatch();

  const isLoadingPosts = useSelector(selectArePostsLoading);
  const isLoadingComments = useSelector(selectAreCommentsLoading);

  const postComments = useSelector((state) =>
    selectCommentsByPostId(state, { postId })
  );
  const postData = useSelector((state) => selectPostsById(state, { postId }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!postComments.length) {
      dispatch(fetchComment(postId));
    }
    if (!postData) {
      dispatch(fetchPost(postId));
    }
  }, []);

  return (
    <div className="post-page-wrap">
      {isLoadingPosts ? (
        <div className="post-placeholder">
          <hr className="separator"></hr>
          <div className="first-rect"></div>
          <hr className="separator"></hr>
          <div className="second-rect"></div>
        </div>
      ) : (
        <div>
          <CommentCreator post={postData} />
          <Post post={postData} editingOption={true} />
        </div>
      )}
      {isLoadingComments ? (
        <div className="comment-section-placeholder">
          <div className="placeholder-comment">
            <div className="inside"></div>
          </div>
          <div className="placeholder-comment">
            <div className="inside"></div>
          </div>
          <div className="placeholder-comment">
            <div className="inside"></div>
          </div>
          <div className="placeholder-comment">
            <div className="inside"></div>
          </div>
          <div className="placeholder-comment">
            <div className="inside"></div>
          </div>
        </div>
      ) : (
        <>
          <CommentSection postComments={postComments} />
        </>
      )}
      <ToastContainer />
    </div>
  );
};
