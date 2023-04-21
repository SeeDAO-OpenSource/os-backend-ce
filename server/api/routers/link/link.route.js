const router = require('express').Router();
const controller = require('./link.controller');

router.route('/create').post(controller.createLinks);
// router.route('/find').post(controller.findLink);

module.exports = router;
