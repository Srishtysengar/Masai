const mongoose = require('mongoose');
const Restaurant = require('./restaurant.model');

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, minlength: 10 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

reviewSchema.statics.calculateAverageRating = async function (restaurantId) {
  const result = await this.aggregate([
    { $match: { restaurant: restaurantId } },
    { $group: {
        _id: '$restaurant',
        avgRating: { $avg: '$rating' }
    }}
  ]);

  const avgRating = result.length ? result[0].avgRating : 0;

  await Restaurant.findByIdAndUpdate(restaurantId, {
    averageRating: avgRating
  });
};

module.exports = mongoose.model('Review', reviewSchema);