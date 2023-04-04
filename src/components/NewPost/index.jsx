import React, {useContext} from 'react';
import axios from 'axios';
import PostForm from '../PostForm';
import { PostContext } from '../../contexts/PostContext';
import { AuthContext } from '../../contexts/AuthContext';


const NewPost = () => {
    const { user } = useContext(AuthContext);

    const { createPost } = useContext(PostContext);


  return (
    <div>
      <h1>New Post</h1>
      <PostForm initialValues={{ title: '', description: '', type: 'offer' }} onSubmit={createPost} />
    </div>
  );
};

export default NewPost;
