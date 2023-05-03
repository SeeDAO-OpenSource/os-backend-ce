const router = require('express').Router();
const userRoute = require('./routers/user/user.route');
const notificationRoute = require('./routers/notification/notification.route');
const fileRoute = require('./routers/file/file.route');
const eventRoute = require('./routers/event/event.route');
const reviewRoute = require('./routers/review/review.route');
const pointRoute = require('./routers/point/point.route');
const linkRoute = require('./routers/link/link.route');
const budgetRoute = require('./routers/budget/budget.route');
const proposalRoute = require('./routers/proposal/proposal.route');

import dotbit from './routers/dotbit';

router.use('/users', userRoute);
router.use('/notifications', notificationRoute);
router.use('/files', fileRoute);
router.use('/events', eventRoute);
router.use('/reviews', reviewRoute);
router.use('/scores', pointRoute);
router.use('/links', linkRoute);
router.use('/budgets', budgetRoute);
router.use('/proposals', proposalRoute);
router.use('/dotbit', dotbit.route);

export default router;