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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    async function initPost() {
      try {
        setLoading(true);
        setError(null);
        const data = await getOnePost(id);
        
        if (!data) {
          setError('Post not found');
          return;
        }
        
        setPost(data);
        setLikesCount(data.likes?.length || 0);
        
        // Fetch comments
        const comments = await getComments(id);
        setComments(Array.isArray(comments) ? comments.slice(0).reverse() : []);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    initPost();
  }, [id]);

  const handleLikes = (operator) => {
    if (operator === "+") setLikesCount((prev) => prev + 1);
    if (operator === "-") setLikesCount((prev) => Math.max(0, prev - 1));
  };

  const onEmojiClick = (event, emojiObject) => {
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
      if (!commentValue.trim()) return;
      
      try {
        const newComment = await createComment(id, commentValue);
        if (newComment) {
          setComments(prev => [newComment, ...prev]);
          setCommentValue("");
        }
      } catch (err) {
        console.error('Error creating comment:', err);
      }
    },
    [id, commentValue]
  );

  if (loading) {
    return (
      <div className="postPage_wrap">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="postPage_wrap">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="postPage_wrap">
        <div className="error">Post not found</div>
      </div>
    );
  }

  return (
    <div className="postPage_wrap">
      <Exitbtn className="exit-btn" />
      <article className="postPage_card">
        <div className="postPage_carousel">
          <Swiper images={post.images || []} />
        </div>
        <div className="postPage_detales">
          <header className="postPage_header">
            <Avatar
              image={post.author?.avatar}
              storyBorder={true}
              iconSize="sm"
            />
            <Link className="link" to={"/profile/" + post.author?.username}>
              <span>{post.author?.username}</span>
            </Link>
          </header>

          <div className="postPage_comments">
            <ScrollArea.Root>
              <ScrollArea.Viewport className="comments_viewport">
                <div className="postPage_body">
                  <Avatar
                    image={post.author?.avatar}
                    storyBorder={true}
                    iconSize="sm"
                  />
                  <div className="postPage_content">
                    <Link
                      className="link"
                      to={"/profile/" + post.author?.username}
                    >
                      <span>{post.author?.username}</span>
                    </Link>
                    <p>{post.body}</p>
                  </div>
                </div>
                {comments.map((comment) => (
                  <div key={comment._id} className="postPage_comment">
                    <Avatar
                      image={comment.author?.avatar}
                      storyBorder={true}
                      iconSize="sm"
                    />
                    <div className="comment_content">
                      <Link
                        className="link"
                        to={"/profile/" + comment.author?.username}
                      >
                        <span>{comment.author?.username}</span>
                      </Link>
                      <p>{comment.content}</p>
                      <span className="comment_time">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
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
              _AGO
            </div>
          </div>
          <form className="add_comment__form" onSubmit={submit}>
            <DropdownMenu.Root modal="false">
              <DropdownMenu.Trigger className="emoji_trigger">
                <Emoji />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content side="top" className="emoji_content">
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
    </div>
  );
}

export default PostPage;
