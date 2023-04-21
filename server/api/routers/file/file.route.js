const router = require('express').Router();
const controller = require('./file.controller');

router.route('/videos/all').post(controller.getAllVideos);
router.route('/videos/find').post(controller.findVideo);

module.exports = router;
