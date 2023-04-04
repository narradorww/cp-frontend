import { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        // lidar com o erro de busca dos posts
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.type}</p>
          <p>{post.status}</p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
          {post.updatedAt !== post.createdAt && (
            <p>{new Date(post.updatedAt).toLocaleString()}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;

