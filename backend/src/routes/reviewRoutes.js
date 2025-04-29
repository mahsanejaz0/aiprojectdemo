const express = require('express');
const router = express.Router();
const { createReview, getPostReviews, getWordFrequency, getPostWordFrequency } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/post/:postId', getPostReviews);
router.get('/word-frequency', getWordFrequency);
router.get('/word-frequency/post/:postId', getPostWordFrequency);

module.exports = router; 