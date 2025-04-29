import React, { useState } from 'react';
import { TextField, Button, Box, Rating, Typography, Alert, Paper } from '@mui/material';
import { createReview } from '../services/api';

const ReviewForm = ({ postId, onReviewCreated }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    content: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newReview = await createReview(postId, formData);
      setFormData({ rating: 0, content: '' });
      onReviewCreated(newReview);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create review');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography component="legend" gutterBottom>
          Rating
        </Typography>
        <Rating
          name="rating"
          value={formData.rating}
          onChange={(event, newValue) => {
            setFormData(prev => ({ ...prev, rating: newValue }));
          }}
          size="large"
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        name="content"
        label="Your Review"
        value={formData.content}
        onChange={handleChange}
        required
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading || !formData.rating || !formData.content.trim()}
        sx={{ 
          py: 1.5,
          fontSize: '1rem',
          textTransform: 'none'
        }}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Paper>
  );
};

export default ReviewForm; 