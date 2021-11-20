import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Card.scss";

import Avatar from "../Avatar/Avatar";
import config from "../../config/index";
import CardMenu from "./CardMenu/CardMenu";
import Carousel from "../Carousel/Carusel";
import { ReactComponent as Emoji } from "../../images/imoji.svg";
import { createComment, getComments } from "../../service/post.service";

function Card({ data: post }) {
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLikes = (operator) => {
    if (operator === "+") setLikesCount((likesCount) => likesCount + 1);
    if (operator === "-") setLikesCount((likesCount) => likesCount - 1);
  };

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComments(post._id);
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [post._id]);

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      const newComment = await createComment(post._id, commentValue);
      console.log("new comment", newComment);
      setComments([newComment, ...comments]);
      setCommentValue("");
    },
    [post._id, commentValue, comments]
  );

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
            <Carousel images={post.images} />
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
          {moment(post.createdAt).fromNow(true)} ago
        </div>
        {/* <div className="addComment">
          <div className="commentText">Add a comment...</div>
          <div className="postText">Post</div>
        </div> */}
        <footer>
          <form onSubmit={submit}>
            {/* comment create */}
            <input
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              type="text"
              placeholder="Write your comment"
            />
            <Emoji />
            <button type="submit">Comment</button>
          </form>
          <ul>
            {comments.map((comment) => {
              // render comment <Comment comment={comment} />
              return <li>{comment.content}</li>;
            })}
          </ul>
        </footer>
      </article>
    </div>
  );
}

export default Card;
