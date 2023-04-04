import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

const Post = ({ post }) => {
  const { updatePost, deletePost } = useContext(PostContext);

  const handleUpdateClick = () => {
    // redirecionar para a página de edição do post
  };

  const handleDeleteClick = () => {
    deletePost(post._id);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>{post.type}</p>
    <p>{post.createdAt}</p>
    <p>{post.status}</p>
      <button onClick={handleUpdateClick}>Editar</button>
      <button onClick={handleDeleteClick}>Excluir</button>
    </div>
  );
};

export default Post;