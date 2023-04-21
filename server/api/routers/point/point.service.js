const pointModel = require('./point.model');
const budgetModel = require('../budget/budget.model');
const linkModel = require('../link/link.model');
const userModel = require('../user/user.model');
const userUtils = require('../user/user.utils');

async function findPointRecordById(id) {
  try {
    return await pointModel.findPointRecordById(id);
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
      return newUser;
    } else {
      return user;
    }
  } catch (error) {
    return error;
  }
}

async function createPointRecords(records) {
  try {
    let finalRecords = [];
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      let links = { tempids: { link: [] } };
      if (record.links && record.links.length > 0) {
        links = await linkModel.createLinks(record.links);
      }
      delete record['links'];
      const beneficiary = await createUserIfNotExist(record.wallet);
      finalRecords.push({
        links: links.tempids.link ? links.tempids.link : [],
        beneficiary: beneficiary['_id'],
        ...record,
      });
    }
    const result = await pointModel.createPointRecords(finalRecords);
    let ids = result.tempids.point ? [...new Set(result.tempids.point)] : [];
    return await pointModel.findPointRecordsById(ids);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function queryPointRecords(search, offset, limit) {
  try {
    let query = search;
    if (!query || query.filter === '' || query.condition === '') {
      return await findAllPointRecords(offset, limit);
    } else if (query.filter === 'budget') {
      const budgetIds = await budgetModel.findBudgetIdsBySubjectInclude(
        query.condition
      );
      const ids = await budgetModel.findPointIdsByBudgetId(budgetIds);
      return await pointModel.findPointRecordsById(ids, offset, limit);
    } else if (
      query.filter === 'creator' ||
      query.filter === 'beneficiary' ) {
      query['where'] = `${query.filter} = ${query.condition}`;
      return await pointModel.queryPointRecords(query, offset, limit);
    } else if(query.filter === 'status'){
      query['where'] = `${query.filter} = "${query.condition}"`;
      return await pointModel.queryPointRecords(query, offset, limit);
    }
    return await pointModel.queryPointRecords(query, offset, limit);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findAllPointRecords(offset, limit) {
  try {
    return await pointModel.findAllPointRecords(offset, limit);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findPointRecordsById(ids) {
  try {
    return await pointModel.findPointRecordsById(ids);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findPointRecordsByCreator(creatorId) {
  try {
    return await pointModel.findPointRecordsByCreator(creatorId);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

module.exports = {
  createPointRecords,
  findPointRecordsById,
  findAllPointRecords,
  queryPointRecords,
  findPointRecordsByCreator,
  findPointRecordById,
};
