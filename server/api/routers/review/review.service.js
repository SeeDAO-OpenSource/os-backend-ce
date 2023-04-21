const reviewModel = require('./review.model');

async function findReviewById(id) {
  try {
    return await reviewModel.findReviewById(id);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

module.exports = {
  findReviewById,
};
