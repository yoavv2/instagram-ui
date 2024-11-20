import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Feed.scss";

import Card from "../../common/Card/Card.js";
import { getFeed } from "../../service/post.service";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getFeed();
        // Use the posts array from the paginated response
        setPosts(response.posts || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading && !posts.length) {
    return <div className="feed_container">Loading...</div>;
  }

  if (error) {
    return <div className="feed_container">Error: {error}</div>;
  }

  return (
    <div className="feed_container">
      {posts.map((post, i) => (
        <Card className="card" data={post} key={post._id || i} />
      ))}
    </div>
  );
}

export default Feed;
