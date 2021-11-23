import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./Profile.scss";

import config from "../../config/index";

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
  useEffect(() => {
    const imagesArray = posts.map((post) => post.images[0]);
  });

  console.log(posts);
  return (
    <div className="profile_container">
      <ProfileHeader
        className="profile_header"
        username={username}
        postNum={posts.length}
      />

      <h2>posts</h2>

      <div className="profile_gallery">
        {posts.map((post) => (
          <Link
            to={"/post/" + post._id}
            className="gallery_images"
            key={post._id}
          >
            <div className="item-info">
              <span>
                <ion-icon name="heart"></ion-icon>
              </span>
              <p>{post.likes.length}</p>
            </div>
            <img src={IMAGE_PATH + "/" + post.images[0]} alt="images" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Profile;
