import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createReview = async (postId, reviewData) => {
  const response = await api.post('/reviews', {
    postId,
    content: reviewData.content,
    rating: reviewData.rating
  });
  return response.data;
};

export const getPostReviews = async (postId) => {
  const response = await api.get(`/reviews/post/${postId}`);
  return response.data;
};

export const getWordFrequency = async () => {
  const response = await api.get('/reviews/word-frequency');
  return response.data;
};

export const getPostWordFrequency = async (postId) => {
  const response = await api.get(`/reviews/word-frequency/post/${postId}`);
  return response.data;
}; 