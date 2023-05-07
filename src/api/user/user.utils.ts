import { utils } from 'ethers';

const AUTH_ID = '_auth/id';

function getWelcomeMessage(data: {
  from: string;
  wallet: string;
  ledger: string;
}): string {
  return (
    `${data.from} wants you to sign in\n with your Ethereum account:\n` +
    `${data.wallet}\n\n` +
    'Sign in with Ethereum to the SeeDAO.\n\n' +
    `URI: ${data.from}\n` +
    'Version: 1\n' +
    `Ledger: ${data.ledger}`
  );
}

function getSignerAddress(msgObj: unknown, signed: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const signerAddress = utils.verifyMessage(
        getWelcomeMessage(msgObj as { from: string; wallet: string; ledger: string }),
        signed
      );
      resolve(signerAddress);
    } catch (error) {
      reject(error);
    }
  });
}

function verifyWallet(
  wallet: string,
  msgObj: unknown,
  signed: string
): Promise<boolean> {
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


function arraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
  
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
  
    return true;
  }

function isAuthEmpty(user: { sysuser?: { auth?: unknown[] } | null }): boolean {
  return (
    user.sysuser === undefined ||
    user.sysuser === null ||
    user.sysuser.auth === undefined ||
    user.sysuser.auth === null ||
    arraysEqual(user.sysuser.auth, [])
  );
}

function isUserNotExist(user: unknown[] | undefined | null): boolean {
    return (
        user === undefined || user === null || arraysEqual(user, [])
      );
    }

export { getSignerAddress, verifyWallet, isUserNotExist, isAuthEmpty, AUTH_ID };
