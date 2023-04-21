const router = require('express').Router();
const controller = require('./TEMPLATE.controller');

router.route('/getSomething').get(controller.getSomething);
router.route('/postSomething').post(controller.postSomething);

module.exports = router;
