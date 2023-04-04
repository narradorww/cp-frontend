import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';
import Post from '../Post';

const PostList = () => {
  const { posts, isLoading, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <p>Aqui vai a lista de posts</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
