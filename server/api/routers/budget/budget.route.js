const router = require('express').Router();
const controller = require('./budget.controller');

router.route('/query/subject').post(controller.queryBudgetSubject);
// router.route('/find').post(controller.findLink);

module.exports = router;
