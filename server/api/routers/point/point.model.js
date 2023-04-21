import pointQuery from './point.query';
import flureedb from '../../../config/flureedb';



async function findPointRecordById(id) {
  const query = pointQuery.findPointRecordById(id);
  console.log('query::',JSON.stringify(query))
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body);
}


async function createPointRecords(records) {
  return new Promise((resolve, reject) => {
    const tx = pointQuery.createPointRecords(records);
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

async function queryPointRecords(search, offset, limit) {
  const query = pointQuery.queryPointRecords(search, offset, limit);
  const response = await flureedb.query(query);
  const body = await response.text();
  const ret = flureedb.bodyParser(body);
  if (!ret) {
    return [];
  } else if (Array.isArray(ret)) {
    return ret;
  } else {
    return [ret];
  }
}

async function findAllPointRecords(offset, limit) {
  const query = pointQuery.findAllPointRecords(offset, limit);
  const response = await flureedb.query(query);
  const body = await response.text();
  const ret = flureedb.bodyParser(body);
  if (!ret) {
    return [];
  } else if (Array.isArray(ret)) {
    return ret;
  } else {
    return [ret];
  }
}

async function findPointRecordsById(ids, offset = 0, limit = 99999999) {
  const query = pointQuery.findPointRecordsById(ids, offset, limit);
  const response = await flureedb.query(query);
  const body = await response.text();
  const ret = flureedb.bodyParser(body);
  if (!ret) {
    return [];
  } else if (Array.isArray(ret)) {
    return ret;
  } else {
    return [ret];
  }
}

async function findPointRecordsByCreator(id) {
  const query = pointQuery.findPointRecordsByCreator(id);
  const response = await flureedb.query(query);
  const body = await response.text();
  const ret = flureedb.bodyParser(body);
  if (!ret) {
    return [];
  } else if (Array.isArray(ret)) {
    return ret;
  } else {
    return [ret];
  }
}

module.exports = {
  createPointRecords,
  findPointRecordsById,
  findPointRecordsByCreator,
  findAllPointRecords,
  findPointRecordById,
  queryPointRecords,
};
