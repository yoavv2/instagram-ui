import React from "react";
import "./CardMenu.scss";

import { ReactComponent as Comment } from "../../../images/comment.svg";
import { ReactComponent as Share } from "../../../images/share.svg";
import { ReactComponent as Like } from "../../../images/like.svg";
import { ReactComponent as Liked } from "../../../images/liked.svg";

import PostLike from "./PostLike/PostLike";

function CardMenu({ post, handleLikes }) {
  return (
    <div className="card_menu">
      <PostLike
        handleLikes={handleLikes}
        className="card_icon"
        postId={post._id}
        likes={post.likes}
      />
      <div>
        <Comment className="card_icon" />
      </div>
      <div>
        <Share className="card_icon " />
      </div>
    </div>
  );
}

export default CardMenu;
