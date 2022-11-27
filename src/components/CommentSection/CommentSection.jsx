import React from 'react'
import { capitilizeFirstLetter } from '../../utils/capitilizeFirstLetter';
import styles from "./styles.module.css";

export const CommentSection = ({commentSections, postId}) => {

    const commentSection = commentSections.find((commentSection) => {
        return Number(Object.keys(commentSection)[0]) === postId
    })

  return (
     <>
        {commentSection[postId].map((comment) => {
            return <div key={comment.id} className={styles.comment}>
                <div className={styles.author}>
                    <p>{capitilizeFirstLetter(comment.name)}</p>
                    <p>{comment.email}</p>
                </div>
                <div className={styles.commentBody}>
                    {capitilizeFirstLetter(comment.body)}
                </div>
            </div>
        })}
    </>
  )
}
