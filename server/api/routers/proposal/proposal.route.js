const router = require('express').Router();
const controller = require('./proposal.controller');

router.route('/metaforo/proposals/find/category').post(controller.fetchMetaforoProposalsByCategory);
router.route('/metaforo/users/find/id').post(controller.findUserByMetaforoUserId);
router.route('/create').post(controller.createProposals);
router.route('/find/id').post(controller.findProposalById);
router.route('/find/title').post(controller.findProposalsByTitle);
router.route('/query/category').post(controller.queryProposalsByCategory);
router.route('/query/all').post(controller.queryAllProposals);

// router.route('/find').post(controller.findLink);

module.exports = router;