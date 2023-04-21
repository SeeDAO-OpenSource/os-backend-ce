// const memberService = require('../member/member.service');
const proposalService = require('./proposal.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {

  findUserByMetaforoUserId: async (req, res) => {
    try {
      const { metaforoUserId } = req.body;
      proposalService
        .findUserByMetaforoUserId(metaforoUserId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findUserByMetaforoUserId', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  createProposals: async (req, res) => {
    try {
      const proposals = req.body;
      proposalService
        .createProposals(Array.isArray(proposals) ? proposals : [proposals])
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'createProposals', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  findProposalsByTitle: async (req, res) => {
    try {
      const { title } = req.body;
      proposalService
        .findProposalsByTitle(title)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findProposalsByTitle', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  findProposalById: async (req, res) => {
    try {
      const { id } = req.body;
      proposalService
        .findProposalById(id)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'findProposalById', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  fetchMetaforoProposalsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.body;
      proposalService
        .fetchMetaforoProposalsByCategory(categoryId)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'fetchMetaforoProposalsByCategory', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  queryAllProposals: async (req, res) => {
    try {
      const { offset, limit } = req.body;
      proposalService
        .queryAllProposals(offset, limit)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'queryAllProposals', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  queryProposalsByCategory: async (req, res) => {
    try {
      const { category, offset, limit } = req.body;
      proposalService
        .queryProposalsByCategory(category, offset, limit)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'queryProposalsByCategory', result));
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
