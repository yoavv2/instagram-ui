import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Menu.scss";

import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as Explore } from "../../images/explore.svg";
import { ReactComponent as Messenger } from "../../images/messenger.svg";
import { ReactComponent as Notifications } from "../../images/notifications.svg";
import { ReactComponent as Add } from "../../images/add.svg";

import { UserContext } from "../../App";
import Avatar from "../Avatar/Avatar";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
function Menu() {
  const { user } = useContext(UserContext);

  const history = useHistory();
  // const location = history.location;

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const clickHandler = (e) => {
      setIsClicked(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="menu">
      <Link to={"/"}>
        <Home className="menu-icon home" />
      </Link>

      <Messenger className="menu-icon messenger" />
      <Add
        className="menu-icon add"
        onClick={() => history.push("/post/create")}
      />
      <Explore className="menu-icon explore" />
      <Notifications className="menu-icon notifications" />
      <div
        onClick={(e) => {
          if (!isClicked) {
            e.stopPropagation();
            setIsClicked(true);
          }
        }}
      >
        <Avatar
          className="profileIcon"
          image={user.avatar}
          iconSize="xsm"
          // onClick={() => history.push(`/profile/${user.username}`)}
        />
      </div>

      {isClicked ? <DropdownMenu /> : ""}
    </div>
  );
}

export default Menu;
