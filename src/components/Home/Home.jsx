import React from "react";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.box}>
      <p>
        Здравствуйте, данный проект выполнен в рамках аттестационного задания.
      </p>
      <p>
        Необходимо было реализовать три сущности(посты, альбомы, todos) и CRUD
        для них, используя{" "}
        <a
          href="https://jsonplaceholder.typicode.com/"
          style={{ color: "blue" }}
        >
          jsonplaceholder API
        </a>
        .
      </p>
      <p>
        {" "}
        Минимальный стек: webpack, React, JavaScript, react-router-dom v6,
        redux/@toolkit, axios.
      </p>
    </div>
  );
}
