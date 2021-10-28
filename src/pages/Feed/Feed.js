import React, { useState, useEffect } from "react";
import "./Feed.scss";

import Post from "../../common/Post/Post.js";
import { getFeed } from "../../service/post.service";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await getFeed();
        setPosts(posts);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="feed-container">
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} data={post} />
        ))}
      </div>
    </div>
  );
}

/* <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
          setUser({});
        }}
      >
        log out
      </button> */

export default Feed;
