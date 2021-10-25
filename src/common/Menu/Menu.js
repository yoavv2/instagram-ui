import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Menu.scss";
import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as Explore } from "../../images/explore.svg";
import { ReactComponent as Messenger } from "../../images/messenger.svg";
import { ReactComponent as Notifications } from "../../images/notifications.svg";
import { ReactComponent as Add } from "../../images/add.svg";

import Avatar from "../Avatar/Avatar";
function Menu() {
  // let page = window.location.pathname;
  // let classname = "/";
  // useEffect(() => {
  //   if (page === "/") {
  //     classname = "home";
  //   } else if (page === "/messenger") {
  //     classname = "messenger";
  //   } else if (page === "/explore") {
  //     classname = "explore";
  //   } else if (page === "/notifications") {
  //     classname = "notifications";
  //   }
  // }, [input]);

  return (
    <div className="menu">
      <Home className="menu-icon home" />
      <Messenger className="menu-icon messenger" />
      <Add className="menu-icon add" />
      <Explore className="menu-icon explore" />
      <Notifications className="menu-icon notifications" />
      <Avatar className="profileIcon" image="./images/avatar.png" />
    </div>
  );
}

export default Menu;
