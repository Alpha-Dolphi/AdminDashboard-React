import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchPosts } from "../../store/post";
import { selectArePostsLoading } from "../../store/post/selectors";
import { Posts } from "../../components/Posts/Posts";
import { fetchComments } from "../../store/comment";
import { selectAreCommentsLoading } from "../../store/comment/selectors";

export const PostsPage = () => {
    const dispatch = useDispatch();
    const isLoadingPosts = useSelector(selectArePostsLoading);
    const isLoadingComments = useSelector(selectAreCommentsLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        dispatch(fetchComments());
    }, []);

    if (isLoadingPosts || isLoadingComments) {
      return <div>Loading...</div>;
    }

    return (
        <>
            <Posts />
            <Outlet />
        </>
    )
}
