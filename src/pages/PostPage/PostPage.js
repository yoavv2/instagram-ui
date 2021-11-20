import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Card from "../../common/Card/Card";
import { getOnePost } from "../../service/post.service";
import config from "../../config/index";

function PostPage() {
  const { id } = useParams();
 ;
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function initPost() {
      const res = await getOnePost(id);
      console.log(res);
      setPost(res);
    }
    initPost();
  }, [id]);

  console.log(`post`, post);

  return (
    <div className="PostPage">
      {post && (
        <div>
          <img src={config.apiUrl + "/" + post.image} />
          <div>
            <strong>{post.author.username}</strong>
          </div>
          <p>{post.body}</p>
        </div>
      )}
      <div className="PostPage__comments">
        <h3>Comments</h3>
      </div>
    </div>
  );
}

export default PostPage;
