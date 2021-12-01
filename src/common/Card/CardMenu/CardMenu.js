import React from "react";
import "./CardMenu.scss";
import { Link } from "react-router-dom";

import { ReactComponent as Comment } from "../../../images/comment.svg";
import { ReactComponent as Share } from "../../../images/share.svg";

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
        <Link className="link" to={"/post/" + post._id}>
          <Comment className="card_icon" />
        </Link>
      </div>

      <Share className="card_icon" />
    </div>
  );
}

export default CardMenu;
