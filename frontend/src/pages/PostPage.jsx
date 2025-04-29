import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Button, CircularProgress, Container, Grid, AppBar, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostForm from '../components/PostForm';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import WordFrequency from '../components/WordFrequency';
import { getPost, getPostReviews, getPostWordFrequency } from '../services/api';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [wordFrequency, setWordFrequency] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [postData, reviewsData, wordFrequencyData] = await Promise.all([
        getPost(id),
        getPostReviews(id),
        getPostWordFrequency(id)
      ]);
      setPost(postData);
      setReviews(reviewsData);
      setWordFrequency(wordFrequencyData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleReviewCreated = (newReview) => {
    setReviews([newReview, ...reviews]);
    // Refresh word frequency after new review
    getPostWordFrequency(id).then(setWordFrequency);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" color="error" align="center">Post not found</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ mb: 4 }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              color="primary"
              sx={{ 
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Back to Posts
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Post Content */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {post.title}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            {post.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Posted on: {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Main Content - Reviews */}
          <Box sx={{ flex: '1 1 auto', maxWidth: '800px' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                mb: 4, 
                borderRadius: 2,
                maxWidth: '100%'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3
                }}
              >
                Write a Review
              </Typography>
              <ReviewForm postId={id} onReviewCreated={handleReviewCreated} />
            </Paper>

            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                maxWidth: '100%'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3
                }}
              >
                Reviews
              </Typography>
              <ReviewList reviews={reviews} />
            </Paper>
          </Box>

          {/* Sidebar - Word Frequency */}
          <Box 
            sx={{ 
              width: '300px', 
              flexShrink: 0,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                position: 'sticky', 
                top: 88,
                borderRadius: 2
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3
                }}
              >
                Word Frequency Analysis
              </Typography>
              {reviews.length > 0 ? (
                <WordFrequency wordFrequency={wordFrequency} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No reviews yet. Be the first to review this post!
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Mobile Word Frequency (shown below reviews on small screens) */}
          <Box 
            sx={{ 
              width: '100%',
              display: { xs: 'block', md: 'none' },
              mt: 4
            }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                borderRadius: 2
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3
                }}
              >
                Word Frequency Analysis
              </Typography>
              {reviews.length > 0 ? (
                <WordFrequency wordFrequency={wordFrequency} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No reviews yet. Be the first to review this post!
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PostPage; 