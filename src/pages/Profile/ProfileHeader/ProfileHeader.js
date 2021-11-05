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
        <Avatar iconSize="lg" image={user.avatar} />
      </div>
      <div className="profile_detale">
        <p>{user.username}</p>
        <p>
          <strong>{postNum} </strong>posts
        </p>
        <h2>{user.fullname}</h2>
      </div>
    </div>
  );
}

export default ProfileHeader;
