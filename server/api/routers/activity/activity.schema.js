const db = require('../../../db');

const ACTIVITY_MODEL_NAME = 'activity';

const activitySchema = db.Schema({
  subject: String,
  checkinCode: String,
  created: Number,
  description: String,
  location: String,
  hosts: [{ updated: Number, wallet: String }],
  guests: [{ updated: Number, wallet: String }],
  recorders: [{ updated: Number, wallet: String }],
  start: Number,
  end: Number,
  organization: String,
  participants: [
    {
      updated: Number,
      wallet: String,
    },
  ],
  applicants: [
    {
      updated: Number,
      wallet: String,
    },
  ],
});

const Activity = db.model(
  ACTIVITY_MODEL_NAME,
  activitySchema,
  ACTIVITY_MODEL_NAME
);

module.exports = {
  Activity,
};
