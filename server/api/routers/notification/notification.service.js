const userModel = require('../user/user.model');
const notificationUtils = require('./notification.utils');

module.exports = {
  verifyAuthCode: async (data) => {
    const user = await userModel.findUserByWallet(data.wallet);
    if (Number(user.verify_code) === Number(data.code)) {
      await userModel.updateUser(data.wallet, { verify_code: null, temporaryEmail: null, email: user.temporaryEmail});
      return { isVerified: true };
    }
    return { isVerified: false };
  },

  sendAuthCode: async (data) => {
    const code = notificationUtils.randomCode();
    await userModel.updateUser(data.wallet, { verify_code: null, temporaryEmail: null });
    await userModel.updateUser(data.wallet, { verify_code: code.toString(), temporaryEmail: data.email });
    await notificationUtils.sendEmail(data.email, code);
    return { isSend: true };
  },
};
