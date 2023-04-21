const pointService = require('./point.service');
const reqResponse = require('../../../cors/responseHandler');

module.exports = {

  findPointRecordById: async (req, res) => {
    try {
      const { recordId } = req.body;
      pointService
        .findPointRecordById(recordId)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'findPointRecordById', result)
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
  createPointRecords: async (req, res) => {
    try {
      const { records } = req.body;
      pointService
        .createPointRecords(records)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(201, 'createPointRecords', result)
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

  queryPointRecords: async (req, res) => {
    try {
      const { query, offset, limit } = req.body;
      pointService
        .queryPointRecords(query, offset, limit)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(
                201,
                'queryPointRecords',
                result
              )
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

  findAllPointRecords: async (req, res) => {
    try {
      const { offset, limit } = req.body;
      pointService
        .findAllPointRecords(offset, limit)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(
                201,
                'findAllPointRecords',
                result
              )
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

  findPointRecordsByCreator: async (req, res) => {
    try {
      const { creatorId } = req.body;
      pointService
        .findPointRecordsByCreator(creatorId)
        .then((result) => {
          res
            .status(201)
            .send(
              reqResponse.successResponse(
                201,
                'findPointRecordsByCreator',
                result
              )
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
};
