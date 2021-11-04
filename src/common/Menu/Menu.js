import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Menu.scss";

import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as Explore } from "../../images/explore.svg";
import { ReactComponent as Messenger } from "../../images/messenger.svg";
import { ReactComponent as Notifications } from "../../images/notifications.svg";
import { ReactComponent as Add } from "../../images/add.svg";
import { UserContext } from "../../App";
import Avatar from "../Avatar/Avatar";
function Menu() {
  const { user } = useContext(UserContext);

  const history = useHistory();
  const location = history.location;

  return (
    <div className="menu">
      <Home className="menu-icon home" />
      <Messenger className="menu-icon messenger" />
      <Add
        className="menu-icon add"
        onClick={() => history.push("/post/create")}
      />
      <Explore className="menu-icon explore" />
      <Notifications className="menu-icon notifications" />
      <Avatar className="profileIcon" image={user.avatar} iconSize="sm" />
    </div>
  );
}

export default Menu;
