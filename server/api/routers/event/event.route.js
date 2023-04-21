const router = require('express').Router();
const controller = require('./event.controller');

router.route('/create').post(controller.createEvent);
router.route('/update').post(controller.updateEvent);
router.route('/review').post(controller.reviewEvent);
router.route('/register').post(controller.registerEvent);
router.route('/attend').post(controller.attendEvent);
router.route('/find/id').post(controller.findEventById);
router.route('/find/interested').post(controller.findEventByInterested);
router.route('/ongoing').post(controller.getOnGoingEvents);
router.route('/notclosed').post(controller.getNotClosedEvents);
router.route('/reviews/all').post(controller.getEventAllReviews);
router.route('/interested/all').post(controller.getEventAllIntrested);
router.route('/attendees/all').post(controller.getEventAllAttendees);
router.route('/contacts/all').post(controller.getEventAllContacts);
router.route('/hosts/all').post(controller.getEventAllHosts);
router.route('/delete').post(controller.deleteEvent);
router.route('/all').post(controller.getAllEvents);

module.exports = router;