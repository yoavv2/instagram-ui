import React from "react";
import "./SearchResult.scss";

import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar/Avatar";

function SearchResult({ user }) {
  //   console.log(users[0].username);
  return (
    <div className="SearchResult">
      <Avatar image={user.avatar} />
      <Link to={"/profile/" + user.username}>{user.username}</Link>
    </div>
  );
}

export default SearchResult;
