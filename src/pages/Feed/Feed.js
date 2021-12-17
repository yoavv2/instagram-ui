import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Feed.scss";

import Card from "../../common/Card/Card.js";
import { getFeed } from "../../service/post.service";

function Feed() {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const getPosts = async () => {
      try {
        const cards = await getFeed();
        setPosts(cards.slice(0).reverse());
        console.log(`fuckk`);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="feed_container">
      {posts.map((post, i) => (
        <Card className="card" data={post} key={i} />
      ))}
    </div>
  );
}

export default Feed;
