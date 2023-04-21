import proposalQuery from './proposal.query';
import flureedb from '../../../config/flureedb';

async function createProposals(proposals) {
  return new Promise((resolve, reject) => {
    const tx = proposalQuery.createProposals(proposals);
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

function findProposalIdByTitle(title) {
  return new Promise((resolve, reject) => {
    const query = proposalQuery.findProposalIdByTitle(title);
    flureedb
      .query(query)
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


function queryAllProposals(offset, limit){
  return new Promise((resolve, reject) => {
    const query = proposalQuery.queryAllProposals(offset, limit);
    flureedb
      .query(query)
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

function queryProposalsByCategory(category, offset, limit){
  return new Promise((resolve, reject) => {
    const query = proposalQuery.queryProposalsByCategory(category, offset, limit);
    flureedb
      .query(query)
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

function findProposalById(ids) {
  return new Promise((resolve, reject) => {
    const query = proposalQuery.findProposalById(ids);
    flureedb
      .query(query)
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
  createProposals,
  findProposalById,
  queryProposalsByCategory,
  findProposalIdByTitle,
  queryAllProposals
};
