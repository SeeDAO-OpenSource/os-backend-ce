// const memberService = require('../member/member.service');
const linkService = require('./link.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {
  createLinks: async (req, res) => {
    try {
      const { links } = req.body;
      linkService
        .createLinks(links)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'createLinks', result));
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
