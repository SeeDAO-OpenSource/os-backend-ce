import userQUery from './user.query';
import flureedb from '../../../config/flureedb';

const ROLE_ID_GUEST = 'guest';
const PASSWORD_GENERATE = 'generate';
const PASSWORD_LOGIN = 'login';


async function quickGetList(data) {
  const query = userQUery.quickGetList(data);
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body);
}

async function findUserByWallet(wallet) {
  if(wallet === null) return null;
  const query = userQUery.findUserByWallet(wallet);
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body);
}

async function findSystemUser(wallet) {
  const query = userQUery.findSystemUser(wallet);
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body);
}

// Discord ----------------------------------------------

function findDiscordInfo(id) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findDiscordInfo(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createDiscordInfo(discord) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createDiscordInfo(discord);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function updateUserDiscordInfo(user, discord) {
  const { id, ...update } = discord;
  if (!('discord' in user)) {
    const original = await findDiscordInfo(id);
    if (original === null) await createDiscordInfo(discord);
    else await updateDiscordInfo(original.id, update);
    const info = await findDiscordInfo(id);
    await updateUser(user.wallet, { discord: Number(info['_id']) });
  } else {
    if (discord.id !== user.discord.id) {
      const original = await findDiscordInfo(id);
      if (original === null) await createDiscordInfo(discord);
      else await updateDiscordInfo(original.id, update);
      const info = await findDiscordInfo(id);
      await updateUser(user.wallet, { discord: Number(info['_id']) });
    }
  }
}

function updateDiscordInfo(id, discord) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateDiscordInfo(id, discord);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

// Twitter ----------------------------------------------

function findTwitterInfo(id) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findTwitterInfo(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createTwitterInfo(twitter) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createTwitterInfo(twitter);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function updateUserTwitterInfo(user, twitter) {
  const { id, ...update } = twitter;
  if (!('twitter' in user)) {
    const original = await findTwitterInfo(id);
    if (original === null) await createTwitterInfo(twitter);
    else await updateTwitterInfo(original.id, update);
    const info = await findTwitterInfo(id);
    await updateUser(user.wallet, { twitter: Number(info['_id']) });
  } else {
    if (twitter.id !== user.twitter.id) {
      const original = await findTwitterInfo(id);
      if (original === null) await createTwitterInfo(twitter);
      else await updateTwitterInfo(original.id, update);
      const info = await findTwitterInfo(id);
      await updateUser(user.wallet, { twitter: Number(info['_id']) });
    }
  }
}

function updateTwitterInfo(id, twitter) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateTwitterInfo(id, twitter);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

// Google ----------------------------------------------
function findGoogleInfo(id) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findGoogleInfo(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createGoogleInfo(google) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createGoogleInfo(google);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function updateUserGoogleInfo(user, google) {
  const { id, ...update } = google;
  if (!('google' in user)) {
    const original = await findGoogleInfo(id);
    if (original === null) await createGoogleInfo(google);
    else await updateGoogleInfo(original.id, update);
    const info = await findGoogleInfo(id);
    await updateUser(user.wallet, { google: Number(info['_id']) });
  } else {
    if (google.id !== user.google.id) {
      const original = await findGoogleInfo(id);
      if (original === null) await createGoogleInfo(google);
      else await updateGoogleInfo(original.id, update);
      const info = await findGoogleInfo(id);
      await updateUser(user.wallet, { google: Number(info['_id']) });
    }
  }
}

function updateGoogleInfo(id, google) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateGoogleInfo(id, google);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

// Telegram ----------------------------------------------
function findTelegramInfo(id) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findTelegramInfo(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createTelegramInfo(telegram) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createTelegramInfo(telegram);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function updateUserTelegramInfo(user, telegram) {
  const { id, ...update } = telegram;
  if (!('telegram' in user)) {
    const original = await findTelegramInfo(id);
    if (original === null) await createTelegramInfo(telegram);
    else await updateTelegramInfo(original.id, update);
    const info = await findTelegramInfo(id);
    await updateUser(user.wallet, { telegram: Number(info['_id']) });
  } else {
    if (telegram.id !== user.telegram.id) {
      const original = await findTelegramInfo(id);
      if (original === null) await createTelegramInfo(telegram);
      else await updateTelegramInfo(original.id, update);
      const info = await findTelegramInfo(id);
      await updateUser(user.wallet, { telegram: Number(info['_id']) });
    }
  }
}

function updateTelegramInfo(id, telegram) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateTelegramInfo(id, telegram);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

// Wechat ----------------------------------------------
function findWechatInfo(wechat) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findWechatInfo(wechat);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}
function createWechatInfo(wechat) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createWechatInfo(wechat);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function updateUserWechatInfo(user, wechat) {
  if (!('wechat' in user)) {
    const original = await findWechatInfo(wechat);
    if (original === null) await createWechatInfo(wechat);
    else await updateWechatInfo(original.wechat, wechat);
    const info = await findWechatInfo(wechat);
    await updateUser(user.wallet, { wechat: Number(info['_id']) });
  } else {
    if (wechat.id !== user.wechat.id || wechat.name !== user.wechat.name) {
      const originalId = { _id: user.wechat['_id'] };
      let update = wechat;
      if (update.id === null) update.id = user.wechat.id;
      if (update.name === null) update.name = user.wechat.name;
      const original = await findWechatInfo(originalId);
      if (original === null) await createWechatInfo(update);
      else await updateWechatInfo(originalId, update);
      const info = await findWechatInfo(originalId);
      await updateUser(user.wallet, { wechat: Number(info['_id']) });
    }
  }
}

function updateWechatInfo(userWechat, wechat) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateWechatInfo(userWechat, wechat);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

// Github ----------------------------------------------
function findGithubInfo(id) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findGithubInfo(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createGithubInfo(github) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createGithubInfo(github);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function updateUserGithubInfo(user, github) {
  const { id, ...update } = github;
  if (!('github' in user)) {
    const original = await findGithubInfo(id);
    if (original === null) await createGithubInfo(github);
    else await updateGithubInfo(original.id, update);
    const info = await findGithubInfo(id);
    await updateUser(user.wallet, { github: Number(info['_id']) });
  } else {
    if (github.id !== user.github.id) {
      const original = await findGithubInfo(id);
      if (original === null) await createGithubInfo(github);
      else await updateGithubInfo(original.id, update);
      const info = await findGithubInfo(id);
      await updateUser(user.wallet, { github: Number(info['_id']) });
    }
  }
}

function updateGithubInfo(id, github) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateGithubInfo(id, github);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}
// Zoom ----------------------------------------------
function findZoomInfo(zoom) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findZoomInfo(zoom);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createZoomInfo(zoom) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createZoomInfo(zoom);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function findAuthDiscordByDiscordId(id){
  return new Promise((resolve, reject) => {
    const tx = userQUery.findAuthDiscordByDiscordId(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function findUserByAuthDiscord(auth){
  return new Promise((resolve, reject) => {
    const tx = userQUery.findUserByAuthDiscord(auth);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function findUserByDiscordId(id){
  const auth = await findAuthDiscordByDiscordId(id);
  if(auth){
    const user = await findUserByAuthDiscord(auth[0]);    
    return user
  }
  return {}
}

async function updateUserZoomInfo(user, zoom) {
  if (!('zoom' in user)) {
    const original = await findZoomInfo(zoom);
    if (original === null) await createZoomInfo(zoom);
    else await updateZoomInfo(original.zoom, zoom);
    const info = await findZoomInfo(zoom);
    await updateUser(user.wallet, { zoom: Number(info['_id']) });
  } else {
    if (zoom.email !== user.zoom.email || zoom.name !== user.zoom.name) {
      const originalId = { _id: user.zoom['_id'] };
      let update = zoom;
      if (update.email === null) update.email = user.zoom.email;
      if (update.name === null) update.name = user.zoom.name;
      const original = await findZoomInfo(originalId);
      if (original === null) await createZoomInfo(update);
      else await updateZoomInfo(originalId, update);
      const info = await findZoomInfo(originalId);
      await updateUser(user.wallet, { zoom: Number(info['_id']) });
    }
  }
}

function updateZoomInfo(userZoom, zoom) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateZoomInfo(userZoom, zoom);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

// ----------------------------------------------

function findRole(id) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findRole(id);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function findUsersById(ids) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.findUsersById(ids);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}



function updateUser(wallet, data) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.updateUser(wallet, data);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createNormalUser(wallet, sysuser) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createNormalUser(wallet, Number(sysuser['_id']));
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function createSystemUser(wallet) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.createSystemUser(wallet);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

function addSystemUserRole(sysuser, role) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.addSystemUserRole(sysuser, role);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}



async function createUser(wallet) {
  await createSystemUser(wallet);
  const sysuser = await findSystemUser(wallet);
  const guestRole = await findRole(ROLE_ID_GUEST);
  await addSystemUserRole(sysuser, guestRole);
  await createNormalUser(wallet, sysuser);
  const user = await findUserByWallet(wallet);
  return user;
}

function userLogin(signed, authId) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.userLogin(signed, authId);
    flureedb
      .pwAction(tx, PASSWORD_LOGIN)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function isExistUser(wallet) {
  const user = await findUserByWallet(wallet);
  if (user === null) {
    return false;
  } else {
    return true;
  }
}

function generateToken(wallet, signed) {
  return new Promise((resolve, reject) => {
    const tx = userQUery.generateToken(wallet, signed);
    flureedb
      .pwAction(tx, PASSWORD_GENERATE)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

module.exports = {
  updateUser,
  findUserByWallet,
  findSystemUser,
  generateToken,
  isExistUser,
  userLogin,
  createUser,
  updateUserGoogleInfo,
  updateUserTwitterInfo,
  updateUserDiscordInfo,
  updateUserGithubInfo,
  updateUserTelegramInfo,
  updateUserWechatInfo,
  updateUserZoomInfo,
  findUserByDiscordId,
  findUserByAuthDiscord,
  findUsersById,
  quickGetList
};
