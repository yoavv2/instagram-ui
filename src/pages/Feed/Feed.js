import React, { useContext, useState, useEffect } from "react";
import "./Feed.scss";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { CardContext } from "../Create/card-context";
import Post from "../../common/Post/Post.js";
import { getFeed } from "../../service/post.service";
import Avatar from "../../common/Avatar/Avatar";
import Create from "../Create/Create";

function Feed() {
  const { setUser } = useContext(UserContext);
  const [isShown, setIsShown] = useState(false);
  const history = useHistory();

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
      <div className="create-wrap">
        <Avatar className="profileIcon" image="./images/avatar.png" />

        <button onClick={() => setIsShown(!isShown)} className="btn-create">
          whats on your mind? name
        </button>
        <div className="border"></div>
      </div>

      <CardContext.Provider value={{ isShown, setIsShown }}>
        <Create className="create-card" />
      </CardContext.Provider>
      {/* <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
          setUser({});
        }}
      >
        log out
      </button> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {posts.map((post) => (
          <Post data={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
