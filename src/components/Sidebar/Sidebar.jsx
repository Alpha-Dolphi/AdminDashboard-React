import React, { useState } from "react";
import "./styles.css";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className={sidebar ? "sidebar-wrap active" : "sidebar-wrap"}>
      <IconContext.Provider value={{}}>
        <Link to="#" className="menu-bars">
          <AiIcons.AiOutlineMenu onClick={showSidebar} />
        </Link>

        <nav className={sidebar ? "nav-menu active" : "nav-menu inactive"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="nav-text">
              <Link to="/">
                <AiIcons.AiOutlineHome />
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/posts">
                <BsIcons.BsFileEarmarkPost />
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/albums">
                <BiIcons.BiPhotoAlbum />
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/todos">
                <BsIcons.BsListCheck />
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};
