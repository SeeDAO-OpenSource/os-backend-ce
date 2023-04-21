const db = require('../../../db');

const ROLE_MODEL_NAME = 'role';

const roleSchema = db.Schema({
  name: String,
  organization: String,

  authorities: [{
    id: String,
    name: String,
  }],
  email: String,
  created: Number,
  data: String,
});

const Role = db.model(ROLE_MODEL_NAME, roleSchema, ROLE_MODEL_NAME);

module.exports = {
  Role,
};
