import React from "react";
import styles from "./styles.module.css";

export const NotFound = () => {
  return (
    <div className={styles.box}>
      <h1>404</h1>
      <h3>PAGE NOT FOUND</h3>
      <p>
        Sorry, the page you're looking for doesn't exist. If you think something
        is broken, please report a problem
      </p>
    </div>
  );
};
