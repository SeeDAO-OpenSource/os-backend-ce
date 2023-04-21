const router = require('express').Router();
const controller = require('./review.controller');

router.route('/find/id').post(controller.findReviewById);

module.exports = router;