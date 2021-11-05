import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Profile.scss";

import config from "../../config/index";

import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { getPosts } from "../../service/post.service";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function initUser() {
      const posts = await getPosts(username);

      setPosts(posts);
    }
    initUser();
  }, [username]);

  return (
    <div className="profile">
      <ProfileHeader
        className="profile_header"
        username={username}
        postNum={posts.length}
      />
      <h2>posts</h2>
      <div className="profile_posts">
        {posts.map((post) => (
          // <Post className="profile_posts__post" key={post._id} data={post} />
          <div key={post._id} className="profile_images">
            <img
              src={config.apiUrl + "/" + post.image}
              className="Post__image"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
