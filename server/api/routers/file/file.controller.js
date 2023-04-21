// const memberService = require('../member/member.service');
const fileService = require('./file.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {
  findVideo: async (req, res) => {
    try {
      const data = req.body;
      fileService
        .findVideo(data)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findVideo', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  getAllVideos: async (req, res) => {
    try {
      const data = req.body;
      fileService
        .getAllVideos(data)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'getAllVideos', result));
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
