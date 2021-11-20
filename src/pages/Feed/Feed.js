import React, { useState, useEffect } from "react";
import "./Feed.scss";

import Card from "../../common/Card/Card.js";
import { getFeed } from "../../service/post.service";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await getFeed();
        setPosts(posts.slice(0).reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="feed-container">
      <div className="feed_position"></div>
      <div className="posts">
        {posts.map((post, index) => (
          <Card key={post._id} data={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
