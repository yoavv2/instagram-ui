import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./ProfileHeader.scss";
import Avatar from "../../../common/Avatar/Avatar";
import {
  getUser,
  follow,
  unfollow,
  me as getMyself,
} from "../../../service/user.service";
import { UserContext } from "../../../App";

function ProfileHeader({ username, postNum }) {
  const [user, setUser] = useState({});
  const [folowersCount, setFolowersCount] = useState(null);
  const { user: me, setUser: setMe } = useContext(UserContext);

  const isFollowing = useMemo(() => {
    return me?.following?.includes(user._id);
  }, [user, me]);

  const handleFollow = useCallback(() => {
    follow(username).then(() => {
      getMyself().then((loggedUser) => {
        setMe(loggedUser);
        setFolowersCount((prev) => prev + 1);
      });
    });
  }, [username, setMe]);

  const handleUnfollow = useCallback(() => {
    unfollow(username).then(() => {
      getMyself().then((loggedUser) => {
        setMe(loggedUser);
        setFolowersCount((prev) => prev - 1);
      });
    });
  }, [username, setMe]);

  useEffect(() => {
    async function initUser() {
      const user = await getUser(username);
      setUser(user);
      setFolowersCount(user.followers.length);
    }
    initUser();
  }, [username, folowersCount]);

  return (
    <div className="profileHeader">
      <div className="profile_avatar">
        <p className="avatar_username">{user.username}</p>
        <Avatar className="avatar_icon" iconSize="xlg" image={user.avatar} />
        <h2 className="avatar_fullname">{user.fullname}</h2>
      </div>
      <div className="header_detale">
        <p className="detale_username">{user.username}</p>
        <div className="follow">
          {me.username !== username ? (
            isFollowing ? (
              <div className="follow_btn">
                <button className="btn_follow__massage"> massage</button>
                <button
                  className="btn_follow__following"
                  onClick={handleUnfollow}
                >
                  <img
                    src="/images/follower.png"
                    alt="following"
                    width="12px"
                    height="12px"
                  />
                </button>
              </div>
            ) : (
              <button className="btn_follow__follow" onClick={handleFollow}>
                Follow
              </button>
            )
          ) : null}
        </div>
        <div className="header_info">
          <p className="info_postnumber">
            <strong>{postNum} </strong> <br />
            posts
          </p>
          <p className="info_follwoers">
            <strong>{folowersCount}</strong> <br />
            Follwoers
          </p>
          <p className="info_following">
            <strong>{user?.following?.length}</strong> <br />
            Following
          </p>
        </div>

        <h2 className="detale_fullname">{user.fullname}</h2>
      </div>
    </div>
  );
}

export default ProfileHeader;
