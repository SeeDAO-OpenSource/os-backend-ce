const ObjectId = require('mongodb').ObjectId;

async function findNotification(query) {
  // const result = await Notification.findOne(query);
  // return result;
}

async function createNotification(wallet, type, email, data) {
  // const now = new Date().getTime();
  // await new Notification({
  //   wallet,
  //   type,
  //   email,
  //   data: JSON.stringify(data),
  //   created: now,
  // }).save();
  // const result = await Notification.findOne({
  //   wallet,
  //   type,
  //   email,
  //   data: JSON.stringify(data),
  //   created: now,
  // });
  return [];
}
async function removeOldNotifications() {
  // const now = new Date().getTime();
  // const founds = await Notification.find(
  //   {
  //     created: { $lte: now - 3600 * 1000 },
  //   },
  //   { wallet: 0, type: 0, email: 0, data: 0, created: 0 }
  // );
  // let objects = [];
  // founds.forEach((f) => {
  //   objects.push(ObjectId(f._id));
  // });
  // const result = await Notification.deleteMany({ _id: { $in: objects } });
  return [];
}

async function deleteNotificationById(id) {
  // const result = await Notification.deleteMany({ _id: { $in: [id] } });
  return [];
}

module.exports = {
  findNotification,
  deleteNotificationById,
  createNotification,
  removeOldNotifications,
};
