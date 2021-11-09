import React, { useState, useEffect } from "react";
import "./ProfileHeader.scss";
import Avatar from "../../../common/Avatar/Avatar";
import { getUser } from "../../../service/user.service";

function ProfileHeader({ username, postNum }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function initUser() {
      const user = await getUser(username);
      setUser(user);
    }
    initUser();
  }, [username]);

  return (
    <div className="profileHeader">
      <div className="profile_avatar">
        <p className="avatar_username">{user.username}</p>
        <Avatar className="avatar_icon" iconSize="xlg" image={user.avatar} />
        <h2 className="avatar_fullname">{user.fullname}</h2>
      </div>
      <div className="header_detale">
        <p className="detale_username">{user.username}</p>
        <div className="header_info">
          {" "}
          <p className="info_postnumber">
            <strong>{postNum} </strong>posts
          </p>
          <p className="info_follwoers">
            <strong>X</strong>Follwoers
          </p>
          <p className="info_following">
            <strong>X </strong>Following
          </p>
        </div>

        <h2 className="detale_fullname">{user.fullname}</h2>
      </div>
    </div>
  );
}

export default ProfileHeader;
