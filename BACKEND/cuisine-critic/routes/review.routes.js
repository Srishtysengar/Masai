const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controllers');

router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;