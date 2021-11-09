import React, { useState, useContext } from "react";
import { UserContext } from "../../../App";
function PostLike({ likes }) {
  const { user } = useContext(UserContext);
  const [hasLiked, setHasLiked] = useState(likes.includes(user._id));
  return (
    <div>{hasLiked ? <button>dislike</button> : <button>like</button>}</div>
  );
}

export default PostLike;
