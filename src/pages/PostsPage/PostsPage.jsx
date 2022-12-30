import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchPosts } from "../../store/post";
import { Posts } from "../../components/Posts/Posts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Heading } from "../../components/Heading/Heading";

const PostsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Heading name={"POSTS PAGE"} searchOption={false} />
      <Posts />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default PostsPage;
