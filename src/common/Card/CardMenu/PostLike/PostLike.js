import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../../App";
import { postLike, postUnlike } from "../../../../service/post.service";
import "./PostLike.scss";

import { ReactComponent as Like } from "../../../../images/like.svg";
import { ReactComponent as Liked } from "../../../../images/liked.svg";

function PostLike({ postId, likes, handleLikes }) {
  const { user } = useContext(UserContext);
  // const [likesCount, setLikesCount] = useState(likes.length);
  const [hasLiked, setHasLiked] = useState(likes.includes(user._id));

  function like() {
    setHasLiked(true);

    // setLikesCount((prev) => prev + 1);
    handleLikes("+");
    postLike(postId).catch(() => {
      setHasLiked(false);
      handleLikes("-");
    });
  }
  function unlike() {
    setHasLiked(false);
    // setLikesCount((prev) => prev - 1);
    handleLikes("-");
    postUnlike(postId).catch(() => {
      setHasLiked(true);
      handleLikes("+");
    });
  }
  useEffect(() => {
    setHasLiked(likes.includes(user._id));
  }, [user, likes]);

  return (
    <div className="like-button">
      {hasLiked ? (
        <div className="like_icon" onClick={unlike}>
          <Liked />
        </div>
      ) : (
        <div className="like_icon" onClick={like}>
          <Like />
        </div>
      )}
      {/* <p className="like_count">
        <strong>{likesCount} </strong>likes
      </p> */}
    </div>
  );
}

export default PostLike;
