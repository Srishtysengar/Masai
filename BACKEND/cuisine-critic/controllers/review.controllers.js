const Review = require('../models/review.model');

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      restaurant: req.params.restaurantId
    });

    await Review.calculateAverageRating(req.params.restaurantId);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReviewsForRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await Review.calculateAverageRating(review.restaurant);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};