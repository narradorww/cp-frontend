import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import jwtDecode from 'jwt-decode';

export const PostContext = createContext();

const API_BASE_URL = 'http://localhost:3001';

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const { accessToken } = useContext(AuthContext);
  
    const getPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to get posts:', error);
      }
    };
  
    useEffect(() => {
      getPosts();
    }, []);
  
    const createPost = async (newPost) => {
        const decodedToken = jwtDecode(accessToken);
        console.log('decodedToken:', decodedToken)
        const userId = decodedToken?.user._id;
        const postWithUserId = { ...newPost, userId };
      console.log('postWithUserId:', postWithUserId)
      
      try {
        const response = await axios.post(`${API_BASE_URL}/posts`, postWithUserId, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts([...posts, response.data]);
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    };
  
    const updatePost = async (id, updatedPost) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/posts/${id}`, updatedPost, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(posts.map((post) => (post._id === id ? response.data : post)));
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    };
  
    const deletePost = async (id) => {
      try {
        await axios.delete(`${API_BASE_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    };
  
    return (
      <PostContext.Provider value={{ posts, createPost, updatePost, deletePost }}>
        {children}
      </PostContext.Provider>
    );
  };