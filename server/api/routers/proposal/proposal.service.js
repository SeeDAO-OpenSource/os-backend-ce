const proposalModel = require('./proposal.model');
const metaforoModel = require('./metaforo.model');
const userModel = require('../user/user.model');
const linkModel = require('../link/link.model');
const userUtils = require('../user/user.utils');

async function findUserByMetaforoUserId(metaforoUserId) {
  try {
    const metaforoUser = await metaforoModel.fetchUser(metaforoUserId);
    if (metaforoUser && metaforoUser.web3_public_key && metaforoUser.username) {
      const wallet = metaforoUser.web3_public_key;
      if (wallet !== '') {
        const nickname = metaforoUser.username;
        const user = await userModel.findUserByWallet(wallet);
        if (userUtils.isUserNotExist(user)) {
          await userModel.createUser(wallet);
          await userModel.updateUser(wallet, { nickname });
          const newUser = await userModel.findUserByWallet(wallet);
          return newUser;
        } else {
          return user;
        }
      }
    }
    return null;
  } catch (error) {
    return error;
  }
}

async function fetchMetaforoProposalsByCategory(categoryId) {
  try {
    return await metaforoModel.fetchMetaforoProposalsByCategory(categoryId);
  } catch (error) {
    return error;
  }
}

async function findProposalById(id) {
  try {
    return await proposalModel.findProposalById(id);
  } catch (error) {
    return error;
  }
}


async function queryAllProposals(offset, limit) {
  try {
    const proposals = await proposalModel.queryAllProposals(offset, limit);
    if (!proposals || (Array.isArray(proposals) && proposals.length === 0)) {
      return [];
    } else {
      return proposals;
    }
  } catch (error) {
    return error;
  }
}

async function queryProposalsByCategory(category, offset, limit) {
  try {
    const proposals = await proposalModel.queryProposalsByCategory(category, offset, limit);
    if (!proposals || (Array.isArray(proposals) && proposals.length === 0)) {
      return [];
    } else {
      return proposals;
    }
  } catch (error) {
    return error;
  }
}


async function findProposalsByTitle(id) {
  try {
    const ids = await proposalModel.findProposalIdByTitle(id);
    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return [];
    } else {
      return await proposalModel.findProposalById(ids);
    }
  } catch (error) {
    return error;
  }
}

async function createProposals(proposals) {
  try {
    let finalProposals = [];
    for (let i = 0; i < proposals.length; i++) {
      let proposal = proposals[i];
      const valid = await proposalModel.findProposalIdByTitle(proposal.title);
      if (!valid || (Array.isArray(valid) && valid.length === 0)) {
        let links = { tempids: { link: [] } };
        if (proposal.links && proposal.links.length > 0) {
          links = await linkModel.createLinks(proposal.links);
        }
        delete proposal['links'];
        if (proposal.tags === []) delete proposal['tags'];
        finalProposals.push({
          links,
          ...proposal,
        });
      }
    }
    if (finalProposals.length > 0) {
      console.log('new!');
      const result = await proposalModel.createProposals(finalProposals);
      const ids = result.tempids.proposal
        ? [...new Set(result.tempids.proposal)]
        : [];
      return await proposalModel.findProposalById(ids);
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
}

module.exports = {
  createProposals,
  findUserByMetaforoUserId,
  findProposalById,
  findProposalsByTitle,
  queryProposalsByCategory,
  queryAllProposals,
  fetchMetaforoProposalsByCategory,
};
