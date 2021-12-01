import React, { useEffect, useState, useRef, useCallback } from "react";
import "./PostPage.scss";
import { useParams, Link } from "react-router-dom";

import Exitbtn from "../../common/Exitbtn/Exitbtn";

import Avatar from "../../common/Avatar/Avatar";
import CardMenu from "../../common/Card/CardMenu/CardMenu";
import Swiper from "../../common/MyCarousel/Swiper";
import { ReactComponent as Emoji } from "../../images/imoji.svg";
import { createComment, getComments } from "../../service/post.service";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import moment from "moment";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { getOnePost } from "../../service/post.service";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    async function initPost() {
      const res = await getOnePost(id);
      console.log("res", res);
      setPost(res);
    }
    initPost();
  }, [id]);

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComments(id);
        setComments(comments.slice(0).reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [id]);
  const [likesCount, setLikesCount] = useState(post?.likes.length);

  const handleLikes = (operator) => {
    if (operator === "+") setLikesCount((likesCount) => likesCount + 1);
    if (operator === "-") setLikesCount((likesCount) => likesCount - 1);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(`chosenEmoji`, emojiObject.emoji);
    const cursor = ref.current.selectionStart;
    const text =
      commentValue.slice(0, cursor) +
      emojiObject.emoji +
      commentValue.slice(cursor);

    setCommentValue(text);
  };
  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      const newComment = await createComment(id, commentValue);
      console.log("new comment", newComment);
      setComments([newComment, ...comments]);
      setCommentValue("");
    },
    [id, commentValue, comments]
  );
  return (
    <div className="postPage_wrap">
      <Exitbtn className="exit-btn" />
      {post ? (
        <article className="postPage_card">
          <div className="postPage_carousel">
            <Swiper images={post.images} />
          </div>
          <div className="postPage_detales">
            <header className="postPage_header">
              <Avatar
                image={post.author.avatar}
                storyBorder={true}
                iconSize="sm"
              />

              <Link className="link" to={"/profile/" + post.author.username}>
                <span>{post.author.username}</span>
              </Link>
            </header>

            <div className="postPage_comments">
              <ScrollArea.Root>
                <ScrollArea.Viewport className="comments_viewport">
                  {comments.length > 0 &&
                    comments.map((comment, i) => {
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
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </div>
            <div className="postPage_actions">
              <CardMenu
                handleLikes={handleLikes}
                post={post}
                className="card_menu"
              />
              <strong>{likesCount} likes</strong>
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
            </div>
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
          </div>
        </article>
      ) : (
        ""
      )}
    </div>
  );
}

export default PostPage;
