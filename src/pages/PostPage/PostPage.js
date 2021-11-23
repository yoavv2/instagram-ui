import React, { useEffect, useState } from "react";
import "./PostPage.scss";
import { useParams } from "react-router-dom";
import Carousel from "../../common/Carousel/Carusel";
import Card from "../../common/Card/Card";

import { getOnePost } from "../../service/post.service";
// import config from "../../config/index";

function PostPage() {
  const { id } = useParams();
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
    <div className="postPage">
      <Card data={post} />
    </div>
  );
}

export default PostPage;
