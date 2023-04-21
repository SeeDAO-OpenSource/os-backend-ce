const router = require('express').Router();
const controller = require('./notification.controller');

router.route('/mail/verify').post(controller.verifyAuthCode);
router.route('/mail/auth').post(controller.sendAuthCode);
// router.route('/update').post(controller.memberUpdate);

module.exports = router;
