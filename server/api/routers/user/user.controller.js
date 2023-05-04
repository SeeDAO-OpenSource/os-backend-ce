const userService = require('./user.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {

  findUsersById: async (req, res) => {
    try {
      const data = req.body;
      userService
        .findUsersById(data)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'findUsersById', result)
            );
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  quickGetList: async (req, res) => {
    try {
      const data = req.body;
      userService
        .quickGetList(data)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'quickGetList', result)
            );
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  findUser: async (req, res) => {
    try {
      const data = req.body;
      userService
        .findUser(data)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'findUser', result)
            );
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  updateUser: async (req, res) => {
    try {
      const data = req.body;
      userService
        .updateUser(data)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'updateUser', result)
            );
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  findUserByDiscordId: async (req, res) => {
    try {
      const { discordId } = req.body;
      userService
        .findUserByDiscordId(discordId)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'findUserByDiscordId', result)
            );
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  walletLogin: async (req, res) => {
    try {
      const { wallet, msgObj, signed } = req.body;
      userService
        .walletLogin(wallet, msgObj, signed)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'walletLogin', result)
            );
        })
        .catch(() => {
          res.status(405).send(reqResponse.errorResponse(405));
        });
    } catch (error) {
      console.error(error);
      res.status(502).send(reqResponse.errorResponse(502));
    }
  },

  pingUser: async (req, res) => {
    try {
      const data = req.body;
      userService
        .pingUser(data)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'pingUser', result)
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
