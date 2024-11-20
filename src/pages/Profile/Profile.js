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
        const response = await getPosts(username);
        setPosts(response.posts || []);
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
        postsCount={posts.length}
        username={username}
      />
      <header>
        <GalleryIcon className='gallery_icon' />
        <h2>Posts</h2>
      </header>
      <div className='profile_gallery'>
        {posts.map((post) => (
          <Link key={post._id} to={'/post/' + post._id} className='gallery_item'>
            <div className='gallery_images'>
              <img
                src={getImageUrl(post.images[0])}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300?text=Error+loading+image';
                }}
                alt={post.body || 'Post image'}
              />
              {post.images.length > 1 && (
                <CarouselIcon className='carousel_icon' />
              )}
              <div className='item-info'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <p>{post.likes?.length || 0}</p>
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24">
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"/>
                  </svg>
                  <p>{post.comments?.length || 0}</p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Profile;
