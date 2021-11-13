import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Post.scss";

import Avatar from "../Avatar/Avatar";
import config from "../../config/index";
import CardMenu from "./CardMenu/CardMenu";
import { ReactComponent as Emoji } from "../../images/imoji.svg";
// import PostLike from "./CardMenu/PostLike/PostLike";

function Post({ data: post }) {
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLikes = (likesCount, operator) => {
    if (operator === "+") setLikesCount((likesCount) => likesCount + 1);
    if (operator === "-") setLikesCount((likesCount) => likesCount - 1);
  };

  return (
    <div className="post_wrapper">
      <article className="Post">
        <header>
          <div className="Post__user">
            <Avatar
              className="profileIcon"
              image={post.author.avatar}
              storyBorder={true}
              iconSize="sm"
            />
            <Link className="link" to={"/profile/" + post.author.username}>
              <span className="Post__user__username">
                {post.author.username}
              </span>
            </Link>
          </div>
          <div className="Post__date"></div>
        </header>
        <div>
          <Link className="link" to={"/post/" + post._id}>
            <img
              src={config.apiUrl + "/" + post.image}
              className="Post__image"
              alt=""
            />
          </Link>
          <CardMenu
            handleLikes={handleLikes}
            post={post}
            className="post__menu"
          />
        </div>
        <div className="like_count">
          <strong>{likesCount} likes</strong>
        </div>
        <div className="likedBy">
          <span>
            Liked by <strong>likedByText</strong> and
            <strong>likedByNumber others</strong>
          </span>
        </div>
        <div className="Post__content">
          <h1 className="Post__description">{post.body}</h1>
        </div>
        <div className="comments"></div>
        <div className="timePosted">
          {/* {moment(post.createdAt).fromNow(true)} ago */}
        </div>
        <div className="addComment">
          <div className="commentText">Add a comment...</div>
          <div className="postText">Post</div>
          <Emoji />
        </div>
      </article>
    </div>
  );
}

export default Post;
