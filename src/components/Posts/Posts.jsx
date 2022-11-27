import React from 'react'
import { createRoot } from 'react-dom/client';
import { useSelector } from 'react-redux';
import { selectAreCommentsLoading, selectCommentEntities } from '../../store/comment/selectors';
import { selectArePostsLoading, selectPostEntities, selectPostIds } from '../../store/post/selectors';
import { CommentSection } from '../CommentSection/CommentSection';
import { Post } from '../Post/Post';
import styles from "./styles.module.css";

export const Posts = () => {
    const isLoadingPosts = useSelector(selectArePostsLoading);
    const isLoadingComments = useSelector(selectAreCommentsLoading);

    if (isLoadingPosts || isLoadingComments) {
        return <div>Loading</div>;
    }

    const posts = useSelector(selectPostEntities);
    const comments = useSelector(selectCommentEntities);
    const postIds = useSelector(selectPostIds);
    const commentSections = postIds.map((postId) => {
        return {
            [postId]: Object.values(comments).filter(((comment) => comment.postId === postId)),
        }
    });

  return (
    <>
    <div className={styles.wrap}>
        <div className={styles.pageTitle}>
            <h1 className={styles.pageTitle}>ARTICLES</h1>
            <button className={styles.newPost}>+</button>
        </div>
        <div className={styles.postsWrap} data-key="postsWrap" id="postsWrap">
            {Object.values(posts).map((post) => {
                return (
                    <div key={post.id} data-key={post.id} className={styles.post}>
                        <Post post={post} commentSections={commentSections} />
                    </div>
                )
            })}
        </div>
    </div>
    </>
  )
}
