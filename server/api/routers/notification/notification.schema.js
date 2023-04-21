const db = require('../../../db');

const NOTIFICATION_MODEL_NAME = 'notification';

const notificationSchema = db.Schema({
  wallet: String,
  type: String,
  email: String,
  created: Number,
  data: String,
});

const Notification = db.model(NOTIFICATION_MODEL_NAME, notificationSchema, NOTIFICATION_MODEL_NAME);

module.exports = {
  Notification,
};
