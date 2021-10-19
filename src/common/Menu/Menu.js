import React from "react";
import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as Explore } from "../../images/explore.svg";
import { ReactComponent as Messenger } from "../../images/messenger.svg";
import { ReactComponent as Notifications } from "../../images/notifications.svg";

import Avatar from "../Avatar/Avatar";
function Menu() {
  return (
    <div>
      <Home className="menu-icon" />
      <Messenger className="menu-icon" />
      <Explore className="menu-icon" />
      <Notifications className="menu-icon" />
      <Avatar className="profileIcon" image="./images/avatar.png" />
    </div>
  );
}

export default Menu;
