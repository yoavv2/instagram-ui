import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Card.scss";

import Avatar from "../Avatar/Avatar";

import CardMenu from "./CardMenu/CardMenu";
import Swiper from "../MyCarousel/Swiper";
import { ReactComponent as Emoji } from "../../images/imoji.svg";
import { createComment, getComments } from "../../service/post.service";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import WebDevCarousel from "../WebDevCarousel/WebDevCarousel";

function Card({ data: post }) {
  const ref = useRef(null);
  // const [chosenEmoji, setChosenEmoji] = useState(null);

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
    <article className={"card"}>
      <header className="card_header">
        <div className={"card_header__user"}>
          <Avatar image={post.author.avatar} storyBorder={true} iconSize="sm" />
          <Link className="link" to={"/profile/" + post.author.username}>
            <span className="card_header__username">
              {post.author.username}
            </span>
          </Link>
        </div>
        <div className="Post_date"></div>
      </header>
      <div className="card_carousel">
        <Swiper images={post.images} />
      </div>

      <CardMenu handleLikes={handleLikes} post={post} className="card_menu" />

      <div className="card_detales">
        <div className="likes_count">
          <strong>{likesCount} likes</strong>

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
        </div>
        <div className="Post_content">
          <h1 className="Post_description">{post.body}</h1>
        </div>
        {comments.length > 2 && (
          <Link to={"/post/" + post._id} className="view_comments_link">
            view all {comments.length} comments
          </Link>
        )}
        <div className="comments_viewPort">
          {comments.length > 0 &&
            comments.slice(0, 2).map((comment, i) => {
              return (
                <div
                  key={i}
                  className="comment"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Link to={"/profile/" + comment.author.username}>
                    <strong>{comment.author.fullname}</strong>
                  </Link>
                  <p style={{ marginLeft: "5px" }}>{comment.content}</p>
                  <strong>
                    {moment(comment.createdAt)
                      .fromNow(true)
                      .replace("a few", "")
                      .replace(" minutes", "m")
                      .replace(" minute", "m")
                      .replace(" seconds", "s")
                      .replace(" second", "s")
                      .replace(" days", "d")
                      .replace(" day", "d")
                      .replace(" hours", "h")
                      .replace(" hour", "h")
                      .replace("an", "1")}
                  </strong>
                </div>
              );
            })}
        </div>

        <div className={"timePosted"}>
          {moment(post.createdAt)
            .fromNow(true)
            .replace("a few", "")
            .replace(" minutes", " MINUITES")
            .replace(" minute", " MINUITE")
            .replace(" seconds", "SECONDS")
            .replace(" second", " SECOND")
            .replace(" days", " DAYS")
            .replace(" day", " DAY")
            .replace(" hours", " HOURS")
            .replace(" hour", " HOUR")
            .replace("an", "1")}
          AGO
        </div>

        <form className={"add_comment__form"} onSubmit={submit}>
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
      </div>
    </article>
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
