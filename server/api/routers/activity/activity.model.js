const { Activity } = require('./activity.schema');

async function addParticipant(id, wallet) {
  const now = new Date();
  return await Activity.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: {
        participants: {
          updated: now.getTime(),
          wallet: wallet,
        },
      },
    },
    { new: true, upsert: true }
  );
}

async function findActivity(id) {
  return await Activity.findOne({ _id: id });
}

async function findActivityAfter(afterStart, afterEnd) {
  const activities = await Activity.find({
    start: { $gte: afterStart },
    end: { $gte: afterEnd },
  });
  return activities;
}

async function createActivity(activity) {
  console.log('model/ activity::', activity);
  const created = await new Activity(activity).save();
  console.log('created::', created);
  await Activity.findOne(
    { subject: activity.subject, start: activity.start, end: activity.end },
    (err, result) => {
      if (err) return console.error(err);
      return result;
    }
  );
}


module.exports = {
  findActivity,
  findActivityAfter,
  createActivity,
  addParticipant,
};
