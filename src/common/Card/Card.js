import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Card.scss";

import Avatar from "../Avatar/Avatar";

import CardMenu from "./CardMenu/CardMenu";
import Carousel from "../Carousel/Carusel";
import { ReactComponent as Emoji } from "../../images/imoji.svg";
import { createComment, getComments } from "../../service/post.service";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function Card({ data: post }) {
  const ref = useRef(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);

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
        setComments(comments.slice(0).reverse());
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

  const onEmojiClick = (event, emojiObject) => {
    console.log(`chosenEmoji`, emojiObject.emoji);
    const cursor = ref.current.selectionStart;
    const text =
      commentValue.slice(0, cursor) +
      emojiObject.emoji +
      commentValue.slice(cursor);

    setCommentValue(text);
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
          <Carousel images={post.images} />

          <CardMenu
            handleLikes={handleLikes}
            post={post}
            className="post__menu"
          />
        </div>
        <div className="like_count">
          <strong>{likesCount} likes</strong>
        </div>
        {likesCount > 0 && (
          <div className="likedBy">
            <span>
              Liked by <strong>You</strong> and
            </span>
            <span>
              <strong>{likesCount - 1} others</strong>
            </span>
          </div>
        )}
        <div className="Post__content">
          <h1 className="Post__description">{post.body}</h1>
        </div>

        <div className="card_comment_view">
          {comments[0] ? (
            <div className="comment">
              <h3>{comments[0].author.fullname}</h3>
              <p>{comments[0].content}</p>
              <span>{moment(comments[0].createdAt).fromNow(true)} ago</span>
            </div>
          ) : (
            ""
          )}
          {comments[1] ? (
            <div className="comment">
              <h3>{comments[0].author.fullname}</h3>
              <p>{comments[1].content}</p>
              <span>{moment(comments[1].createdAt).fromNow(true)} ago</span>
            </div>
          ) : (
            ""
          )}
          {comments[2] ? (
            <div className="comment">
              <h3>{comments[0].author.fullname}</h3>
              <p>{comments[2].content}</p>
              <span>{moment(comments[2].createdAt).fromNow(true)} ago</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="timePosted">
          {moment(post.createdAt).fromNow(true)} ago
        </div>

        {/* <ul>
          {comments.length > 0 &&
            comments.map((comment, i) => {
              // render comment <Comment comment={comment} />
              return <li key={comment._id}>{comment.content}</li>;
            })}
        </ul> */}

        <footer>
          <form className="add_comment__form" onSubmit={submit}>
            <DropdownMenu.Root modal="false">
              <DropdownMenu.Trigger className="emoji_trigger">
                <Emoji />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                side="right"
                side="top"
                className="emoji_content"
              >
                <DropdownMenu.Item>
                  <Picker
                    onEmojiClick={onEmojiClick}
                    disableAutoFocus={true}
                    skinTone={SKIN_TONE_MEDIUM_DARK}
                    groupNames={{ smileys_people: "PEOPLE" }}
                    disableSearchBar={true}
                    native
                  />
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className="dropDown_arrow" />
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <input
              ref={ref}
              className="add_comment__input "
              name="description"
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
              type="text"
              placeholder="Add a comment..."
              autoComplete="off"
            />

            <button
              disabled={!commentValue}
              className="add_comment__btn"
              type="submit"
            >
              Post
            </button>
          </form>
        </footer>
      </article>
    </div>
  );
}
// const EmojiData = ({ chosenEmoji }) => (
//   <div>
//     <strong>Unified:</strong> {chosenEmoji.unified}
//     <br />
//     <strong>Names:</strong> {chosenEmoji.names.join(", ")}
//     <br />
//     <strong>Symbol:</strong> {chosenEmoji.emoji}
//     <br />
//     <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
//   </div>
// );

export default Card;
