import reviewQuery from './review.query';
import flureedb from '../../../config/flureedb';

async function findReviewByFromAndTarget(fromId, targetId) {
  return new Promise((resolve, reject) => {
    const tx = reviewQuery.findReviewByFromAndTarget(fromId, targetId);
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

async function findReviewById(id) {
    return new Promise((resolve, reject) => {
      const tx = reviewQuery.findReviewById(id);
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

async function createReview(event) {
    return new Promise((resolve, reject) => {
      const tx = reviewQuery.createReview(event);
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

  async function updateReview(id, event) {
    return new Promise((resolve, reject) => {
      const tx = reviewQuery.updateReview(id, event);
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
  findReviewByFromAndTarget,
  findReviewById,
  createReview,
  updateReview
};
