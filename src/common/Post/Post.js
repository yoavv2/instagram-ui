import moment from "moment";
import { Link } from "react-router-dom";
import "./Post.scss";

import Avatar from "../Avatar/Avatar";
import config from "../../config/index";
import CardMenu from "../CardMenu/CardMenu";
import { ReactComponent as Emoji } from "../../images/imoji.svg";

function Post({ data }) {
  return (
    <div className="post_wrapper">
      <article className="Post">
        <header>
          <div className="Post__user">
            <Avatar
              className="profileIcon"
              image={data.author.avatar}
              storyBorder={true}
              iconSize="sm"
            />
            <Link className="link" to={"/profile/" + data.author.username}>
              <span className="Post__user__username">
                {data.author.username}
              </span>
            </Link>
          </div>
          <div className="Post__date"></div>
        </header>
        <div>
          <Link className="link" to={"/post/" + data._id}>
            <img
              src={config.apiUrl + "/" + data.image}
              className="Post__image"
              alt=""
            />
          </Link>
          <CardMenu className="post__menu" />
        </div>
        <div className="like_count">
          <strong>{data.likes.length} likes</strong>
        </div>
        <div className="likedBy">
          <span>
            Liked by <strong>likedByText</strong> and{" "}
            <strong>likedByNumber others</strong>
          </span>
        </div>
        <div className="Post__content">
          <h1 className="Post__description">{data.body}</h1>
        </div>
        <div className="comments"></div>
        <div className="timePosted">
          {moment(data.createdAt).fromNow(true)} ago
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
