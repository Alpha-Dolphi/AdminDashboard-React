import React from 'react'
import { capitilizeFirstLetter } from '../../utils/capitilizeFirstLetter';
import { CommentSection } from '../CommentSection/CommentSection';
import styles from "./styles.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../../store/post';

export const Post = ({post, commentSections}) => {
    const dispatch = useDispatch();

    const deletePostOnClick = async (event) => {
        const postKey = event.target.closest("div").dataset.key;

        event.preventDefault();
        dispatch(deletePost(postKey));
    }

    const savePostOnClick = async (event, originalPost) => {
        const postKey = event.target.closest("div").dataset.key;
        const post = event.target.closest(`[data-key="${postKey}"]`);
        const newPost = document.createElement("div");

        const firstInput = post.children[2].value;
        const secondInput = post.children[4].value;

        post.innerHTML = originalPost
        post.children[2].innerText = firstInput.trim();
        post.children[4].innerText = secondInput.trim();

        post.children[0].children[0].addEventListener("click", (event) => updatePostOnClick(event, originalPost));
        post.children[0].children[1].addEventListener("click", (event) => deletePostOnClick(event, post));

        dispatch(
            updatePost({
                title: firstInput,
                body: secondInput,
                postKey: postKey,
            })
        );

    }

    const updatePostOnClick = async (event) => {
        const postKey = event.target.closest("div").dataset.key;
        const post = event.target.closest(`[data-key="${postKey}"]`);

        const originalPost = post.innerHTML;
        post.innerHTML = `
                    <span class=${post.children[0].className}>
                        <button class=${post.children[0].children[0].className}><b>SAVE</b></button>
                        <button  class=${post.children[0].children[0].className}><b>DELETE</b></button>
                    </span>
                    ${post.children[1].outerHTML}
                    <textarea
                        type="text"
                        style="
                            width: 100%;
                            height: 250px;
                            background-color: var(--semi-light-background-color);
                            border-radius: 10px;
                            scale: 92%;
                            font-size: 2.5rem;
                            resize: none;
                            color: var(--dark-text-color);
                        "
                    >
                    ${post.children[2].innerText}
                    </textarea>
                    ${post.children[3].outerHTML}
                    <textarea
                        type="text"
                        style="
                            width: 100%;
                            height: 250px;
                            background-color: var(--semi-light-background-color);
                            border-radius: 10px;
                            scale: 92%;
                            font-size: 1.8rem;
                            resize: none;
                            color: var(--dark-text-color);
                        "
                    >
                    ${post.children[4].innerText}
                    </textarea>
                    ${post.children[5].outerHTML}
                    <span class=${post.lastChild.className}>
                        ${post.lastChild.innerHTML}
                    </span>
        `
        post.children[0].children[0].addEventListener("click", (event) => savePostOnClick(event, originalPost));
        post.children[0].children[1].addEventListener("click", (event) => deletePostOnClick(event, post));

        event.preventDefault();
    }

  return (
    <>
                    <span className={styles.panel}>
                        <button onClick={(event) => updatePostOnClick(event)} className={styles.update}><b>UPDATE</b></button>
                        <button onClick={(event) => deletePostOnClick(event)} className={styles.delete}><b>DELETE</b></button>
                    </span>
                    <hr className={styles.separatorFirst}></hr>
                    <h1 className={styles.postTitle}>{capitilizeFirstLetter(post.title)}</h1>
                    <hr className={styles.separator}></hr>
                    <p className={styles.postText}>{capitilizeFirstLetter(post.body)}</p>
                    <hr className={styles.separator}></hr>
                    <span className={styles.CommentSectionWrap}>
                        <CommentSection commentSections={commentSections} postId={post.id}/>
                    </span>
    </>
  )
}
