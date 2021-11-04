import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Profile.scss";

import ProfileHeader from "./ProfileHeader/ProfileHeader";

import Post from "../../common/Post/Post";

import { getPosts } from "../../service/post.service";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function initUser() {
      const posts = await getPosts(username);
      console.log(`posts`, posts);
      setPosts(posts);
    }
    initUser();
  }, [username]);

  return (
    <div className="profile">
      <ProfileHeader username={username} postNum={posts.length} />
      <h2>posts</h2>
      <div className="profile__posts">
        {posts.map((post) => (
          <Post key={post._id} data={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
