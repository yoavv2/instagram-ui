import React from "react";
import "./SearchResult.scss";

import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar/Avatar";

function SearchResult({ user, onClose }) {
  //   console.log(users[0].username);
  return (
    <div className="searchResult">
      <Avatar image={user.avatar} storyBorder={true} />
      <Link
        onClick={onClose}
        className="link_result"
        to={"/profile/" + user.username}
      >
        <div className="searchResult_username"> {user.username}</div>
      </Link>
    </div>
  );
}

export default SearchResult;
