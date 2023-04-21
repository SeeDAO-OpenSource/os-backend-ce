// const memberService = require('../member/member.service');
const notificationService = require('./notification.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {
  // verifyAuthCode: async (req, res) => {
  //   try {
  //     const data = req.body;
  //     notificationService
  //       .verifyAuthCode(data)
  //       .then((result) => {
  //         if (result.error !== '') {
  //           res.status(402).send(reqResponse.errorResponse(402));
  //         } else {
  //           memberService
  //             .memberUpdate(result.wallet, result.update)
  //             .then((member) => {
  //               res
  //                 .status(201)
  //                 .send(
  //                   reqResponse.successResponse(201, 'verifyAuthCode', member)
  //                 );
  //             })
  //             .catch(() => {
  //               res.status(402).send(reqResponse.errorResponse(402));
  //             });
  //         }
  //       })
  //       .catch(() => {
  //         res.status(402).send(reqResponse.errorResponse(402));
  //       });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(502).send(reqResponse.errorResponse(502));
  //   }
  // },

  verifyAuthCode: async (req, res) => {
    try {
      const data = req.body;
      notificationService
        .verifyAuthCode(data)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'verifyAuthCode', result));
        })
        .catch(() => {
          res.status(402).send(reqResponse.errorResponse(402));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  sendAuthCode: async (req, res) => {
    try {
      const data = req.body;
      notificationService
        .sendAuthCode(data)
        .then((result) => {
          res
            .status(201)
            .send(reqResponse.successResponse(201, 'sendAuthCode', result));
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
