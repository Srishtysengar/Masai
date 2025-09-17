const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controllers');
const reviewController = require('../controllers/review.controllers');


router.post('/', restaurantController.createRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:restaurantId', restaurantController.getRestaurantById);
router.put('/:restaurantId', restaurantController.updateRestaurant);


router.post('/:restaurantId/reviews', reviewController.createReview);
router.get('/:restaurantId/reviews', reviewController.getReviewsForRestaurant);

module.exports = router;