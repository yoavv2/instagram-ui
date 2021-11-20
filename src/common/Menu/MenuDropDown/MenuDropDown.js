import React, { useContext } from "react";
import "./MenuDropDown.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";

import { ReactComponent as Profile } from "../../../images/profile.svg";
import { ReactComponent as Logout } from "../../../images/logoutIcon.svg";

import Avatar from "../../Avatar/Avatar";
function MenuDropDown() {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();
  return (
    <div>
      <DropdownMenu.Root className="menu_dropdown">
        <DropdownMenu.Trigger className="trigger">
          <div className="profileIcon">
            <Avatar image={user.avatar} iconSize="xsm" />
          </div>
        </DropdownMenu.Trigger>
        {/* <div className="dropdown_square"></div> */}
        <DropdownMenu.Content className="content">
          {/* <div className="dropdown_border"></div> */}
          <DropdownMenu.Item className="item">
            <Link className="dropdown_link" to={"/profile/" + user.username}>
              <Profile /> <span>profile</span>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="item logout"
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/login");
              setUser({});
            }}
          >
            <Logout className="logout_icon" />
            <span> log out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default MenuDropDown;
