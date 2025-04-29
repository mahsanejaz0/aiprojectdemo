import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { getPosts } from '../services/api';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Container >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
              mb: 4
            }}
          >
            Blog Posts
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 6,
              // maxWidth: 'sm',
              mx: 'auto',
              borderRadius: 2
            }}
          >
            <PostForm onPostCreated={handlePostCreated} />
          </Paper>
        </Box>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 500,
              color: 'text.primary',
              mb: 4
            }}
          >
            All Posts
          </Typography>
          
          <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
            <PostList posts={posts} loading={loading} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 