import React from "react";
import { useSelector } from "react-redux";
import {
  selectArePostsLoading,
  selectPostEntities,
} from "../../store/post/selectors";
import { Post } from "../Post/Post";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const Posts = () => {
  const isLoadingPosts = useSelector(selectArePostsLoading);

  const posts = useSelector(selectPostEntities);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.postsWrap} id="postsWrap">
          {isLoadingPosts ? (
            <>
              <div className={styles["post-placeholder"]}></div>
              <div className={styles["post-placeholder"]}></div>
              <div className={styles["post-placeholder"]}></div>
              <div className={styles["post-placeholder"]}></div>
              <div className={styles["post-placeholder"]}></div>
              <div className={styles["post-placeholder"]}></div>
            </>
          ) : (
            Object.values(posts).map((postData) => {
              return (
                <div key={postData.id} data-key={postData.id}>
                  <Link to={`/posts/${postData.id}`} className={styles.link}>
                    <Post post={postData} editingOption={false} />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
