const activityModel = require('./activity.model');

module.exports = {
  createActivity: async (activity) => {
    console.log('activity:', activity);
    const results = await activityModel.createActivity(activity);
    return results;
  },

  getUpcomingActivity: async () => {
    const now = new Date();
    const results = await activityModel.findActivityAfter(
      0,
      now.getTime() - 60 * 60 * 1000
    );
    return results;
  },

  checkinActivity: async (checkin) => {
    const activity = await activityModel.findActivity(checkin.activityId);
    const found = activity.participants.find(
      (p) => p.wallet === checkin.wallet
    );
    if (found !== undefined && found !== null) {
      return {
        isChecked: false,
        result: { error: 'already-checkin' },
      };
    }
    if (String(activity.checkinCode) === String(checkin.checkinCode)) {
      const result = await activityModel.addParticipant(
        activity._id,
        checkin.wallet
      );
      return { isChecked: true, result: { error: '', ...result } };
    } else {
      return {
        isChecked: false,
        result: { error: 'checkin-code-incorrect' },
      };
    }
  },
};
