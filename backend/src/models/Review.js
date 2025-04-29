const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  sentiment: {
    score: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      required: true
    }
  },
  wordFrequency: {
    type: Map,
    of: Number,
    default: new Map()
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema); 