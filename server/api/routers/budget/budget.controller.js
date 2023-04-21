// const memberService = require('../member/member.service');
const budgetService = require('./budget.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {
  queryBudgetSubject: async (req, res) => {
    try {
      const { season } = req.body;
      budgetService
        .queryBudgetSubject(season)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'queryBudgetSubject', result));
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
