import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./styles.module.css";

export const Layout = ({ children }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
