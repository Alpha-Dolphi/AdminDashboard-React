import React from "react";
import { Heading } from "../../components/Heading/Heading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoPageContent from "../../components/TodoPageContent/TodoPageContent";

export const TodosPage = () => {
  return (
    <>
      <Heading name={"TODOS PAGE"} />
      <TodoPageContent />
      <ToastContainer />
    </>
  );
};
