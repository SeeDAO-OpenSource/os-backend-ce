const router = require('express').Router();
const controller = require('./activity.controller');

router.route('/upcoming').get(controller.getUpcomingActivity);
router.route('/create').post(controller.createActivity);
router.route('/checkin').post(controller.checkinActivity);

module.exports = router;
