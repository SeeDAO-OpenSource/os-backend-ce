const COLLECTION_POINT = 'point';
const COLLECTION_USER = 'user';

const SELECT_POINT_BASIC = [
  { creator: ['nickname', 'wallet'] },
  { beneficiary: ['nickname', 'wallet'] },
  'status',
  'value_claim',
  'datetime',
  { budget: ['subject'] },
];

const SELECT_POINT_FULL = [
  '*',
  { creator: ['nickname', 'wallet'] },
  { beneficiary: ['nickname', 'wallet'] },
  'wallet',
  'notes',
  'event',
  'status',
  'value_claim',
  'value_fulfilled',
  'datetime',
  { budget: ['subject'] },
  { links: ['title', 'url'] },
  'transactions',
];

function createPointRecords(records) {
  let query = [];
  records.forEach((record) => {
    query.push({
      _id: COLLECTION_POINT,
      ...record,
    });
  });
  return query;
}

function findPointRecordsById(ids, offset, limit) {
  return {
    select: SELECT_POINT_BASIC,
    from: ids,
    opts: {
      offset,
      limit,
      orderBy: ['DESC', 'datetime'],
    },
  };
}

function queryPointRecords(query, offset, limit) {
  let q = {
    select: SELECT_POINT_BASIC,
    from: COLLECTION_POINT,
    opts: {
      offset,
      limit,
      orderBy: ['DESC', 'datetime'],
    },
  };
  if (query && query.where && query.where !== '') {
    q['where'] = query.where;
  }
  return q;
}

function findAllPointRecords(offset, limit) {
  return {
    select: SELECT_POINT_BASIC,
    from: COLLECTION_POINT,
    opts: {
      offset,
      limit,
      orderBy: ['DESC', 'datetime'],
    },
  };
}

function findPointRecordsByCreator(id) {
  return {
    select: SELECT_POINT_BASIC,
    from: COLLECTION_POINT,
    where: `creator = ${id}`,
  };
}

function findPointRecordById(id) {
  return {
    select: SELECT_POINT_FULL,
    from: Number(id)
  };
}



module.exports = {
  createPointRecords,
  findPointRecordsById,
  findPointRecordById,
  findPointRecordsByCreator,
  findAllPointRecords,
  queryPointRecords,
};
