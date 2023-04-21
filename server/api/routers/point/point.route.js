const router = require('express').Router();
const controller = require('./point.controller');

// router.route('/find/applicant').get(controller.findPointRecordsByApplicant);
router.route('/create').post(controller.createPointRecords);
router.route('/find/creator').post(controller.findPointRecordsByCreator);
router.route('/find/id').post(controller.findPointRecordById);
router.route('/find/all').post(controller.findAllPointRecords);
router.route('/query').post(controller.queryPointRecords);

module.exports = router;
