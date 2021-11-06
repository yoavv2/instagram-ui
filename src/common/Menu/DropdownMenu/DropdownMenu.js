import React, { useContext } from "react";
import "./DropdownMenu.scss";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Profile } from "../../../images/profile.svg";
import { ReactComponent as Logout } from "../../../images/logoutIcon.svg";
import { UserContext } from "../../../App";
function DropdownMenu() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  return (
    <div>
      <div className="dropdown_square"></div>
      <div className="dropdown_background" onClick={(e) => e.stopPropagation()}>
        <div className="dropdown__border"></div>
        <Link
          className="dropdown_link dropdown_item"
          to={"/profile/" + user.username}
        >
          <Profile /> <span>profile</span>
        </Link>
        <div
          className="dropdown_item logout"
          onClick={() => {
            localStorage.removeItem("token");
            history.push("/login");
            setUser({});
          }}
        >
          <Logout className="logout_icon" />
          <span> log out</span>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
