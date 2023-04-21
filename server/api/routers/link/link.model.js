import linkQuery from './link.query';
import flureedb from '../../../config/flureedb';

async function createLinks(links) {
  return new Promise((resolve, reject) => {
    const tx = linkQuery.createLinks(links);
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

module.exports = {
  createLinks,
};
