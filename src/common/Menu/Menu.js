import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.scss";

import { ReactComponent as Home } from "../../images/home.svg";
import { ReactComponent as HomeBlack } from "../../images/home-black.svg";
import { ReactComponent as Explore } from "../../images/explore.svg";
import { ReactComponent as ExploreBlack } from "../../images/explore-black.svg";
import { ReactComponent as Messenger } from "../../images/messenger.svg";
import { ReactComponent as MessengerBlack } from "../../images/messenger-black.svg";
import { ReactComponent as Notifications } from "../../images/notifications.svg";
import { ReactComponent as Add } from "../../images/add.svg";
import { ReactComponent as AddBlack } from "../../images/add-black.svg";

import DropdownMenu from "./MenuDropDown/MenuDropDown";

function Menu() {
  const location = useLocation();
 
  const { pathname } = location;

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <div className="menu">
      <Link to={"/"}>
        {path === "/" ? (
          <HomeBlack className="menu-icon" />
        ) : (
          <Home className="menu-icon" />
        )}
      </Link>
      <Link to={"/post/create"}>
        {path === "/post/create" ? (
          <AddBlack className="menu-icon" />
        ) : (
          <Add className="menu-icon" />
        )}
      </Link>
      <Link to="/message">
        {path === "/message" ? (
          <MessengerBlack className="menu-icon" />
        ) : (
          <Messenger className="menu-icon" />
        )}
      </Link>
      <Link to="/explore">
        {path === "/explore" ? (
          <ExploreBlack className="menu-icon" />
        ) : (
          <Explore className="menu-icon " />
        )}
      </Link>
      <div>
        <Notifications className="menu-icon notifications" />
      </div>

      <DropdownMenu className="menu-icon" />
    </div>
  );
}

export default Menu;
