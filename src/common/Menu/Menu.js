import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Menu.scss";

import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as Explore } from "../../images/explore.svg";
import { ReactComponent as Messenger } from "../../images/messenger.svg";
import { ReactComponent as Notifications } from "../../images/notifications.svg";
import { ReactComponent as Add } from "../../images/add.svg";
import { UserContext } from "../../App";
import Avatar from "../Avatar/Avatar";
function Menu() {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();
  const location = history.location;

  return (
    <div className="menu">
      <Link to={"/"}>
        {" "}
        <Home className="menu-icon home" />
      </Link>

      <Messenger className="menu-icon messenger" />
      <Add
        className="menu-icon add"
        onClick={() => history.push("/post/create")}
      />
      <Explore className="menu-icon explore" />
      <Notifications className="menu-icon notifications" />
      <Link to={"/profile/" + user.username}>
        <Avatar
          className="profileIcon"
          image={user.avatar}
          iconSize="sm"
          // onClick={() => history.push(`/profile/${user.username}`)}
        />
      </Link>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
          setUser({});
        }}
      >
        log out
      </button>
    </div>
  );
}

export default Menu;
