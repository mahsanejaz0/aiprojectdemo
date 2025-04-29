import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Rating, Chip, Divider } from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ReviewList = ({ reviews }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <SentimentVerySatisfiedIcon color="success" />;
      case 'negative':
        return <SentimentDissatisfiedIcon color="error" />;
      default:
        return <SentimentNeutralIcon color="action" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  if (reviews.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body1" color="text.secondary">
          No reviews yet. Be the first to review this post!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {reviews.map((review) => (
        <Grid item xs={12} key={review._id}>
          <Card 
            sx={{ 
              borderRadius: 2,
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: (theme) => theme.shadows[4]
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 2 
                }}
              >
                <Box>
                  <Rating 
                    value={review.rating} 
                    readOnly 
                    size="medium"
                    sx={{ 
                      color: 'primary.main',
                      mb: 0.5
                    }} 
                  />
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    ml: 'auto'
                  }}
                >
                  {getSentimentIcon(review.sentiment.label)}
                  <Chip
                    label={review.sentiment.label}
                    color={getSentimentColor(review.sentiment.label)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                  {/* <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ ml: 1 }}
                  >
                    Score: {review.sentiment.score}
                  </Typography> */}
                </Box>
              </Box>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  lineHeight: 1.7,
                  fontSize: '1rem'
                }}
              >
                {review.content}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box 
                display="flex" 
                alignItems="center" 
                color="text.secondary"
              >
                <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReviewList; 