const userModel = require('./user.model');
const userUtils = require('./user.utils');

async function updateUser(updateData) {
  try {
    const { wallet, ...data } = updateData;
    const user = await userModel.findUserByWallet(wallet);
    if ('nickname' in data)
      await userModel.updateUser(wallet, { nickname: data.nickname });
    if ('google' in data)
      await userModel.updateUserGoogleInfo(user, data.google);
    if ('twitter' in data)
      await userModel.updateUserTwitterInfo(user, data.twitter);
    if ('discord' in data)
      await userModel.updateUserDiscordInfo(user, data.discord);
    if ('github' in data)
      await userModel.updateUserGithubInfo(user, data.github);
    if ('telegram' in data)
      await userModel.updateUserTelegramInfo(user, data.telegram);
    if ('wechat' in data)
      await userModel.updateUserWechatInfo(user, data.wechat);
    if ('zoom' in data) await userModel.updateUserZoomInfo(user, data.zoom);

    const updated = await userModel.findUserByWallet(wallet);
    return updated;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}


async function quickGetList(data) {
  try {
    return await userModel.quickGetList(data);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findUsersById(users) {
  try {
    let ids = [];
    users.forEach((user) => {
      if (user['_id']) {
        ids.push(Number(user['_id']));
      }
    });
    return await userModel.findUsersById(ids);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findUser(data) {
  try {
    const { wallet } = data;
    return await userModel.findUserByWallet(wallet);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findUserByDiscordId(id) {
  try {
    return await userModel.findUserByDiscordId(id);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function createUserIfNotExist(wallet) {
  try {
    const user = await userModel.findUserByWallet(wallet);
      if (userUtils.isUserNotExist(user)) {
        await userModel.createUser(wallet);
        const newUser = await userModel.findUserByWallet(wallet);
        return newUser
      }else{
        return user
      }
  } catch (error) {
    return error;
  }
}

async function walletLogin(wallet, msgObj, signed) {
  try {
    const isVerified = userUtils.verifyWallet(wallet, msgObj, signed);
    if (isVerified) {
      const user = await userModel.findUserByWallet(wallet);
      if (userUtils.isUserNotExist(user)) {
        await userModel.createUser(wallet);
        const token = await userModel.generateToken(wallet, signed);
        return { token };
      } else if (userUtils.isAuthEmpty(user)) {
        const token = await userModel.generateToken(wallet, signed);
        return { token };
      } else {
        const authId = user.sysuser.auth[0][userUtils.AUTH_ID];
        const token = await userModel.userLogin(signed, authId);
        return { token };
      }
    } else {
      throw 'InvaliWalletSigner';
    }
  } catch (error) {
    return error;
  }
}

async function pingUser(data) {
  const user = await userModel.findUserByWallet(data.wallet);
  return user;
}

module.exports = {
  findUserByDiscordId,
  walletLogin,
  findUser,
  updateUser,
  pingUser,
  findUsersById,
  quickGetList,
  createUserIfNotExist,
};
