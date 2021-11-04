import React, { useState, useEffect } from "react";

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
    <div className="profile__header">
      <div className="profile__avatar">
        <Avatar iconSize="lg" />
      </div>
      <div>
        <h2>{user.username}</h2>
        <p>{postNum} posts</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
