import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, CardActionArea } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PostList = ({ posts, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body1" color="text.secondary">
          No posts yet. Be the first to create a post!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} key={post._id}>
          <Card 
            sx={{ 
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: (theme) => theme.shadows[8],
                '& .arrow-icon': {
                  transform: 'translateX(4px)',
                }
              },
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <CardActionArea onClick={() => navigate(`/post/${post._id}`)}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 500,
                      color: 'primary.main',
                      mb: 2
                    }}
                  >
                    {post.title}
                  </Typography>
                  <ArrowForwardIcon 
                    className="arrow-icon" 
                    sx={{ 
                      transition: 'transform 0.3s ease',
                      color: 'primary.main'
                    }} 
                  />
                </Box>

                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 3,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.6
                  }}
                >
                  {post.content}
                </Typography>

                <Box display="flex" alignItems="center" color="text.secondary">
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList; 