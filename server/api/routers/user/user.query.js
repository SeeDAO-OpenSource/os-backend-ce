const TEMPID_USER = 'user';
const USER_WALLET = 'wallet';
const USER_EMAIL = 'email';
const USER_NICKNAME = 'nickname';
const TEMPID_SYSTEM_USER = '_user';
const SYSUSER_USERNAME = 'username';
const AUTH_GOOGLE_ID = 'id';
const AUTH_TWITTER = 'auth_twitter';
const AUTH_DISCORD = 'auth_discord';
const AUTH_GITHUB = 'auth_github';
const AUTH_TELEGRAM = 'auth_telegram';
const AUTH_WECHAT = 'auth_wechat';
const AUTH_ZOOM = 'auth_zoom';
const TEMPID_AUTH_GOOGLE = 'auth_google';
const ID = 'id';

const SELECT_USERS_BASIC = [
  USER_WALLET,
  USER_NICKNAME,
  USER_EMAIL,
  { twitter: ['name', 'handle'] },
  { discord: ['name', 'id'] },
];

function quickGetList(data){
  return {
    select: [USER_NICKNAME, USER_WALLET],
    from: `${TEMPID_USER}`,
  };
}

function updateUser(wallet, data) {
  return [
    {
      _id: [`${TEMPID_USER}/${USER_WALLET}`, wallet.toLowerCase()],
      ...data,
    },
  ];
}

// Telegram

function updateTelegramInfo(id, telegram) {
  return [
    {
      _id: [`${AUTH_TELEGRAM}/${ID}`, String(id)],
      ...telegram,
    },
  ];
}

function createTelegramInfo(telegram) {
  return [
    {
      _id: AUTH_TELEGRAM,
      ...telegram,
    },
  ];
}
function findAuthDiscordByDiscordId(id) {
  return {
    select: [{ '?discord': ['*'] }],
    where: [
      ['?discord', 'auth_discord/id', '?id'],
      { filter: [`(re-find (re-pattern "${id}") ?id)`] },
    ],
  };
}

function findUserByAuthDiscord(auth) {
  return {
    select: [USER_NICKNAME, USER_EMAIL, USER_WALLET],
    from: ['user/discord', auth['_id']],
  };
}

function findRole(id) {
  return {
    select: [
      '*',
      'id',
      'doc',
      {
        rules: [
          '*',
          'id',
          'doc',
          'collection',
          'collectionDefault',
          'fns',
          'ops',
        ],
      },
    ],
    from: [`_role/id`, String(id)],
  };
}

function findTelegramInfo(id) {
  return {
    select: ['*', 'handle', 'name', ID],
    from: [`${AUTH_TELEGRAM}/${ID}`, String(id)],
  };
}

// Wechat

function updateWechatInfo(userWechat, wechat) {
  let _id = [];
  if ('_id' in userWechat) _id = Number(userWechat['_id']);
  else {
    if ('id' in userWechat)
      _id = [`${AUTH_WECHAT}/${ID}`, String(userWechat.id)];
    if ('name' in userWechat)
      _id = [`${AUTH_WECHAT}/name`, String(userWechat.name)];
  }
  return [
    {
      _id,
      ...wechat,
    },
  ];
}

function addSystemUserRole(sysuser, role) {
  return [
    {
      _id: Number(sysuser['_id']),
      roles: [Number(role['_id'])],
    },
  ];
}

function createWechatInfo(wechat) {
  return [
    {
      _id: AUTH_WECHAT,
      ...wechat,
    },
  ];
}

function findWechatInfo(wechat) {
  let from = [];
  if ('_id' in wechat) from = Number(wechat['_id']);
  else {
    if ('id' in wechat) from = [`${AUTH_WECHAT}/${ID}`, String(wechat.id)];
    if ('name' in wechat) from = [`${AUTH_WECHAT}/name`, String(wechat.name)];
  }
  return {
    select: ['*', 'name', ID],
    from,
  };
}

// Zoom

function updateZoomInfo(userZoom, zoom) {
  let _id = [];
  if ('_id' in userZoom) _id = Number(userZoom['_id']);
  else {
    if ('email' in userZoom)
      _id = [`${AUTH_ZOOM}/email`, String(userZoom.email)];
    if ('name' in userZoom) _id = [`${AUTH_ZOOM}/name`, String(userZoom.name)];
  }
  return [
    {
      _id,
      ...zoom,
    },
  ];
}

function createZoomInfo(zoom) {
  return [
    {
      _id: AUTH_ZOOM,
      ...zoom,
    },
  ];
}

function findZoomInfo(zoom) {
  let from = [];
  if ('_id' in zoom) from = Number(zoom['_id']);
  else {
    if ('email' in zoom) from = [`${AUTH_ZOOM}/email`, String(zoom.email)];
    if ('name' in zoom) from = [`${AUTH_ZOOM}/name`, String(zoom.name)];
  }
  return {
    select: ['*', 'name', ID],
    from,
  };
}

// Github

function updateGithubInfo(id, github) {
  return [
    {
      _id: [`${AUTH_GITHUB}/${ID}`, String(id)],
      ...github,
    },
  ];
}

function createGithubInfo(github) {
  return [
    {
      _id: AUTH_GITHUB,
      ...github,
    },
  ];
}

function findGithubInfo(id) {
  return {
    select: ['*', 'name', 'username', ID],
    from: [`${AUTH_GITHUB}/${ID}`, String(id)],
  };
}

// Discord

function updateDiscordInfo(id, discord) {
  return [
    {
      _id: [`${AUTH_DISCORD}/${ID}`, String(id)],
      ...discord,
    },
  ];
}

function createDiscordInfo(discord) {
  return [
    {
      _id: AUTH_DISCORD,
      ...discord,
    },
  ];
}

function findDiscordInfo(id) {
  return {
    select: ['*', 'name', 'avatar', ID],
    from: [`${AUTH_DISCORD}/${ID}`, String(id)],
  };
}

// Twitter

function updateTwitterInfo(id, twitter) {
  return [
    {
      _id: [`${AUTH_TWITTER}/${ID}`, String(id)],
      ...twitter,
    },
  ];
}

function createTwitterInfo(twitter) {
  return [
    {
      _id: AUTH_TWITTER,
      ...twitter,
    },
  ];
}

function findTwitterInfo(id) {
  return {
    select: ['*', 'name', 'handle', ID],
    from: [`${AUTH_TWITTER}/${ID}`, String(id)],
  };
}

// Google

function updateGoogleInfo(id, google) {
  return [
    {
      _id: [`${TEMPID_AUTH_GOOGLE}/${AUTH_GOOGLE_ID}`, String(id)],
      ...google,
    },
  ];
}

function createGoogleInfo(google) {
  return [
    {
      _id: TEMPID_AUTH_GOOGLE,
      ...google,
    },
  ];
}

function findUsersById(ids) {
  return {
    select: SELECT_USERS_BASIC,
    from: ids,
  };
}

function findGoogleInfo(id) {
  return {
    select: ['*', 'name', 'email', AUTH_GOOGLE_ID],
    from: [`${TEMPID_AUTH_GOOGLE}/${AUTH_GOOGLE_ID}`, String(id)],
  };
}

function findUserByWallet(wallet) {
  return {
    select: [
      '*',
      USER_NICKNAME,
      USER_EMAIL,
      USER_WALLET,
      'temporaryEmail',
      'verify_code',
      { sysuser: ['*', SYSUSER_USERNAME, { auth: ['*'] }, { roles: ['*'] }] },
      { google: ['*', 'name', 'email', AUTH_GOOGLE_ID] },
      { profile: ['*'] },
      { wechat: ['*', 'id', 'name'] },
      { telegram: ['*', 'id', 'handle', 'name'] },
      { twitter: ['*', 'name', 'email', 'handle'] },
      { zoom: ['*', 'name', 'email'] },
      { github: ['*', 'id', 'username', 'name'] },
      { discord: ['name', 'id'] },
    ],
    from: [`${TEMPID_USER}/${USER_WALLET}`, wallet.toLowerCase()],
  };
}

function findSystemUser(wallet) {
  return {
    select: ['*'],
    from: [`${TEMPID_SYSTEM_USER}/${SYSUSER_USERNAME}`, wallet.toLowerCase()],
  };
}

function createNormalUser(wallet, sysUserId) {
  return [
    {
      _id: TEMPID_USER,
      wallet: wallet.toLowerCase(),
      sysuser: sysUserId,
    },
  ];
}

function createSystemUser(wallet) {
  return [
    {
      _id: TEMPID_SYSTEM_USER,
      username: wallet.toLowerCase(),
    },
  ];
}

function generateToken(wallet, signed) {
  return {
    password: signed,
    user: wallet.toLowerCase(),
  };
}

function userLogin(signed, authId) {
  return {
    auth: authId,
    password: signed,
  };
}

module.exports = {
  updateGoogleInfo,
  updateUser,
  createGoogleInfo,
  findUserByWallet,
  findSystemUser,
  generateToken,
  createNormalUser,
  createSystemUser,
  findGoogleInfo,
  userLogin,
  updateTwitterInfo,
  createTwitterInfo,
  findTwitterInfo,
  updateDiscordInfo,
  createDiscordInfo,
  findDiscordInfo,
  updateGithubInfo,
  createGithubInfo,
  findGithubInfo,
  updateTelegramInfo,
  createTelegramInfo,
  findTelegramInfo,
  updateWechatInfo,
  createWechatInfo,
  findWechatInfo,
  updateZoomInfo,
  createZoomInfo,
  findZoomInfo,
  addSystemUserRole,
  findRole,
  findAuthDiscordByDiscordId,
  findUserByAuthDiscord,
  findUsersById,
  quickGetList
};
