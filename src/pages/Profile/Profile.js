import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Profile.scss";

import config from "../../config/index";
import Carousel from "../../common/Carousel/Carusel";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { getPosts } from "../../service/post.service";

function Profile() {
  const IMAGE_PATH = config.apiUrl;
  // const objctUrl = URL.createObjectURL(IMAGE_PATH);
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
    <div className="profile_container">
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
              <Carousel images={post.images} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
