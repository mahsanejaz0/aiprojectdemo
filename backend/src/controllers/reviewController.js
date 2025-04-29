const Review = require('../models/Review');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Helper function to analyze sentiment
const analyzeSentiment = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      score: 0,
      label: 'neutral'
    };
  }

  try {
    // Configure additional sentiment words
    const options = {
      extras: {
        // Positive words with scores
        'excellent': 5,
        'amazing': 5,
        'fantastic': 5,
        'great': 4,
        'love': 4,
        'perfect': 5,
        'best': 4,
        'awesome': 5,
        'wonderful': 4,
        'good': 3,
        
        // Negative words with scores
        'terrible': -5,
        'horrible': -5,
        'awful': -5,
        'worst': -5,
        'hate': -4,
        'disappointing': -3,
        'bad': -3,
        'poor': -3,
        'broke': -3,
        'waste': -4
      }
    };

    // Analyze the text with our custom configuration
    const result = sentiment.analyze(text, options);

    // Determine sentiment label based on score
    let label = 'neutral';
    if (result.score > 0) {
      label = 'positive';
    } else if (result.score < 0) {
      label = 'negative';
    }

    // Return both the detailed analysis and our simplified label
    return {
      score: result.score,
      comparative: result.comparative,
      label: label,
      calculation: result.calculation,
      tokens: result.tokens,
      words: result.words,
      positive: result.positive,
      negative: result.negative
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return {
      score: 0,
      comparative: 0,
      label: 'neutral',
      calculation: [],
      tokens: [],
      words: [],
      positive: [],
      negative: []
    };
  }
};

// Helper function to calculate word frequency
const calculateWordFrequency = (text) => {
  if (!text || typeof text !== 'string') {
    return new Map();
  }

  try {
    // Use the same tokenization as sentiment analysis
    const tokens = text.toLowerCase().match(/\b[\w']+\b/g) || [];
    const frequency = new Map();
    
    tokens.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });
    
    return frequency;
  } catch (error) {
    console.error('Error calculating word frequency:', error);
    return new Map();
  }
};

// Create a new review with sentiment analysis
exports.createReview = async (req, res) => {
  try {
    const { postId, content, rating } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Review content cannot be empty' });
    }

    if (!rating || rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 0 and 5' });
    }

    const sentimentResult = analyzeSentiment(content);
    const wordFrequency = calculateWordFrequency(content);

    // Consider rating in final sentiment if sentiment is neutral
    if (rating >= 4 && sentimentResult.label === 'neutral') {
      sentimentResult.label = 'positive';
      sentimentResult.score = Math.max(sentimentResult.score, 1);
    } else if (rating <= 2 && sentimentResult.label === 'neutral') {
      sentimentResult.label = 'negative';
      sentimentResult.score = Math.min(sentimentResult.score, -1);
    }

    const review = await Review.create({
      postId,
      content,
      rating,
      sentiment: sentimentResult,
      wordFrequency
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review' });
  }
};

// Get reviews for a specific post
exports.getPostReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get word frequency across all reviews
exports.getWordFrequency = async (req, res) => {
  try {
    const reviews = await Review.find();
    const globalWordFrequency = new Map();

    reviews.forEach(review => {
      review.wordFrequency.forEach((count, word) => {
        globalWordFrequency.set(word, (globalWordFrequency.get(word) || 0) + count);
      });
    });

    const wordFrequencyArray = Array.from(globalWordFrequency.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Get top 20 most frequent words

    res.status(200).json(wordFrequencyArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get word frequency for a specific post
exports.getPostWordFrequency = async (req, res) => {
  try {
    const reviews = await Review.find({ postId: req.params.postId });
    const postWordFrequency = new Map();

    reviews.forEach(review => {
      review.wordFrequency.forEach((count, word) => {
        postWordFrequency.set(word, (postWordFrequency.get(word) || 0) + count);
      });
    });

    const wordFrequencyArray = Array.from(postWordFrequency.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Get top 20 most frequent words

    res.status(200).json(wordFrequencyArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 