import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Profile.scss";

import config from "../../config/index";

import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { getPosts } from "../../service/post.service";

function Profile() {
  const IMAGE_PATH = config.apiUrl;
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function initUser() {
      const posts = await getPosts(username);

      setPosts(posts);
    }
    initUser();
  }, [username]);

  // const divStyle = {
  //   backgroundImage: "url(" + posts.featured_image_src + ")",
  // };

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
          <div key={post._id} className="profile_images">
            <div
              className="Post__image"
              style={{
                backgroundImage: `url("https://via.placeholder.com/250"`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "250px",
                height: "20px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
