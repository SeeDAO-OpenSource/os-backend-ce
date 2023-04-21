const eventService = require('./event.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {

  findEventByInterested: async (req, res) => {
    try {
      const { userId } = req.body;
      eventService
        .findEventByInterested(userId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findEventByInterested', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },
  
  findEventById: async (req, res) => {
    try {
      const { id } = req.body;
      eventService
        .findEventById(id)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findEventById', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const select = req.body;
      eventService
        .getAllEvents(select)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getAllEvents', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getOnGoingEvents: async (req, res) => {
    try {
      const select = req.body;
      eventService
        .getOnGoingEvents(select)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getOnGoingEvents', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getNotClosedEvents: async (req, res) => {
    try {
      const select = req.body;
      eventService
        .getNotClosedEvents(select)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getNotClosedEvents', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getEventAllReviews: async (req, res) => {
    try {
      const { eventId } = req.body;
      eventService
        .getEventAllReviews(eventId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getEventAllReviews', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  
  getEventAllIntrested: async (req, res) => {
    try {
      const { eventId } = req.body;
      eventService
        .getEventAllIntrested(eventId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getEventAllIntrested', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getEventAllContacts: async (req, res) => {
    try {
      const { eventId } = req.body;
      eventService
        .getEventAllContacts(eventId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getEventAllContacts', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getEventAllHosts: async (req, res) => {
    try {
      const { eventId } = req.body;
      eventService
        .getEventAllHosts(eventId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getEventAllHosts', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getEventAllAttendees: async (req, res) => {
    try {
      const { eventId } = req.body;
      eventService
        .getEventAllAttendees(eventId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getEventAllAttendees', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  
  deleteEvent: async (req, res) => {
    try {
      const { eventId } = req.body;
      console.log('eventId::', eventId)
      eventService
        .deleteEvent(eventId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'deleteEvent', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  registerEvent: async (req, res) => {
    try {
      const { eventId, userId } = req.body;
      eventService
        .registerEvent(eventId, userId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'registerEvent', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  attendEvent: async (req, res) => {
    try {
      const { eventId, userId, attendCode } = req.body;
      eventService
        .attendEvent(eventId, userId, attendCode)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'attendEvent', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  reviewEvent: async (req, res) => {
    try {
      const review = req.body;
      eventService
        .reviewEvent(review)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'reviewEvent', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  updateEvent: async (req, res) => {
    try {
      const { id, event } = req.body;
      eventService
        .updateEvent(id, event)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'updateEvent', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  createEvent: async (req, res) => {
    try {
      const data = req.body;
      eventService
        .createEvent(data)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'createEvent', result));
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },
};
