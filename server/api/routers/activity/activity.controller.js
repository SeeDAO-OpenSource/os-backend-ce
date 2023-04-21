const activityService = require('./activity.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {

  createActivity: async (req, res) => {
    try {
      const activity = req.body;
      activityService
        .createActivity(activity)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'getUpcomingActivity', result)
            );
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  
  getUpcomingActivity: async (req, res) => {
    try {
      activityService
        .getUpcomingActivity()
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'getUpcomingActivity', result)
            );
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  checkinActivity: async (req, res) => {
    try {
      const checkin = req.body;
      activityService
        .checkinActivity(checkin)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'checkinActivity', result)
            );
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },
};
