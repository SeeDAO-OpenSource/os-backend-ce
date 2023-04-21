const reviewService = require('./review.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {
  findReviewById: async (req, res) => {
    try {
      const { id } = req.body;
      reviewService
        .findReviewById(id)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findReviewById', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },
};
