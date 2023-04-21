const router = require('express').Router();
const controller = require('./user.controller');

router.route('/ping').post(controller.pingUser);
router.route('/find/discord/id').post(controller.findUserByDiscordId);
router.route('/wallet/login').post(controller.walletLogin);
router.route('/profile/update').post(controller.updateUser);
router.route('/find').post(controller.findUser);
router.route('/find/id').post(controller.findUsersById);
router.route('/quick/list').post(controller.quickGetList);

module.exports = router;
