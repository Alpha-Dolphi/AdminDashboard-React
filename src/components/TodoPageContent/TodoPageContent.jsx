import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../store/todo";
import {
  selectAreTodosLoading,
  selectTodoEntities,
} from "../../store/todo/selectors";
import { SortableList } from "../SortableList/SortableList";
import styles from "./styles.module.css";

export default function TodoPageContent() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAreTodosLoading);
  const todos = useSelector(selectTodoEntities);
  const uncompletedTodos = Object.values(todos).filter(
    (todo) => !todo.completed
  );
  const completedTodos = Object.values(todos).filter((todo) => todo.completed);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div className={styles.header}>
          <p>Uncompleted:</p>{" "}
        </div>
        <div className={styles.header}>
          <p>Completed: </p>{" "}
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        {isLoading ? (
          <>
            <div
              style={{
                boxShadow: "1px 1px 30px #999999",
                width: "100%",
                height: "600px",
                border: "1px solid #c6c9cb",
                borderRadius: "3px",
                padding: "5px",
                background: "white",
              }}
            >
              <div
                style={{ width: "100%", height: "100%", background: "#ebebeb" }}
              ></div>
            </div>
            <div
              style={{
                boxShadow: "1px 1px 30px #999999",
                width: "100%",
                height: "600px",
                border: "1px solid #c6c9cb",
                borderRadius: "3px",
                padding: "5px",
                background: "white",
              }}
            >
              <div
                style={{ width: "100%", height: "100%", background: "#ebebeb" }}
              ></div>
            </div>
          </>
        ) : (
          <>
            <SortableList
              completedTodos={completedTodos}
              uncompletedTodos={uncompletedTodos}
            />
          </>
        )}
      </div>
    </>
  );
}
