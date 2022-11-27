import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchTodos } from "../../store/todo";
import { selectAreTodosLoading } from "../../store/todo/selectors";
import axios from 'axios';
import { Todos } from "../../components/Todos/Todos";

export const TodosPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAreTodosLoading);

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
        <>
            <Todos />
            <Outlet />
        </>
    )
}
