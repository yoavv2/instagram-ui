import React, { useState, useEffect, useCallback } from "react";
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
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);
  // const elemnt = useCallback((index, post) => {
  //   return (
  //     <div className="card_feed" key={post._id}>
  //       <Card data={post} />
  //     </div>
  //   );
  // }, []);

  return (
    <div className="feed_container">
      {posts.map((post, i) => (
        <Card className="card" data={post} key={i} />
      ))}
    </div>
  );
}

export default Feed;
