import React from "react";
import styles from "./styles.module.css";
import classnames from "classnames";

import { Link } from "react-router-dom";

export const Header = ({ className }) => {
  return (
    <header className={classnames(styles.root, className)}>
      <Link to="/posts">POSTS</Link>
      <Link to="/albums">ALBUMS</Link>
      <Link to="/todos">TODOS</Link>
    </header>
  );
};
