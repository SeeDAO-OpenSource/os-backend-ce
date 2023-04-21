const ethers = require('ethers');

const AUTH_ID = '_auth/id';

function getWelcomeMessage(data) {
  return (
    `${data.from} wants you to sign in\n with your Ethereum account:\n` +
    `${data.wallet}\n\n` +
    'Sign in with Ethereum to the SeeDAO.\n\n' +
    `URI: ${data.from}\n` +
    'Version: 1\n' +
    `Ledger: ${data.ledger}`
  );
}

function getSignerAddress(msgObj, signed) {
  return new Promise((resolve, reject) => {
    try {
      const signerAddress = ethers.utils.verifyMessage(
        getWelcomeMessage(msgObj),
        signed
      );
      resolve(signerAddress);
    } catch (error) {
      reject(error);
    }
  });
}

function verifyWallet(wallet, msgObj, signed) {
  return new Promise((resolve, reject) => {
    getSignerAddress(msgObj, signed)
      .then((address) => {
        if (address.toLowerCase() === wallet.toLowerCase()) {
          resolve(true);
        }
        resolve(false);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function isAuthEmpty(user) {
  return (
    user.sysuser === undefined ||
    user.sysuser === null ||
    user.sysuser.auth === undefined ||
    user.sysuser.auth === null ||
    user.sysuser.auth === []
  );
}

function isUserNotExist(user) {
  return user === undefined || user === null || user === [];
}

module.exports = {
  getSignerAddress,
  verifyWallet,
  isUserNotExist,
  isAuthEmpty,
  AUTH_ID,
};
