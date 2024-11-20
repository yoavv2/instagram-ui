import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import './Profile.scss';

import config from '../../config/index';
import { ReactComponent as CarouselIcon } from '../../images/svg-carousel.svg';
import { ReactComponent as GalleryIcon } from '../../images/GalleryIcon.svg';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import { getPosts } from '../../service/post.service';

function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userPosts = await getPosts(username);
        setPosts(userPosts.slice(0).reverse());
      } catch (err) {
        console.error('Error loading posts:', err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    initUser();
  }, [username]);

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/300?text=No+image';
    return image.startsWith('http') ? image : `${config.apiUrl}/${image}`;
  };

  if (loading) {
    return <div className='profile_container'>Loading...</div>;
  }

  if (error) {
    return <div className='profile_container'>Error: {error}</div>;
  }

  return (
    <div className='profile_container'>
      <ProfileHeader
        className='profile_header'
        username={username}
        postNum={posts.length}
      />
      <header>
        <GalleryIcon className='gallery_icon' />
        <h2>Posts</h2>
      </header>

      <div className='profile_gallery'>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              to={'/post/' + post._id}
              className='gallery_images'
              key={post._id}
            >
              <div className='item-info'>
                <span>
                  <ion-icon name='heart'></ion-icon>
                </span>
                <p>{post.likes?.length || 0}</p>
              </div>
              <img
                src={post.images && post.images[0] ? getImageUrl(post.images[0]) : 'https://via.placeholder.com/300?text=No+image'}
                alt={`Post by ${post.author?.username || 'user'}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300?text=Image+not+found';
                }}
              />
              {post.images && post.images.length > 1 && (
                <div className='carousel_icon'>
                  <CarouselIcon />
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className='no-posts'>No posts yet</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
