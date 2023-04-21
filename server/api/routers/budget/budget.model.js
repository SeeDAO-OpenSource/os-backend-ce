import budgetQuery from './budget.query';
import flureedb from '../../../config/flureedb';

async function queryBudgetSubject(season) {
  const query = budgetQuery.queryBudgetSubject(season);
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body);
}

async function findBudgetIdsBySubjectInclude(keyword) {
  const query = budgetQuery.queryBudgetIdBySubjectInclude(keyword);
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body)
    ? flureedb
        .bodyParser(body)
        .flat()
        .map((a) => a['_id'])
    : [];
}

async function findPointIdsByBudgetId(ids) {
  const query = budgetQuery.queryPointRecordsByBudgetId(ids);
  const response = await flureedb.query(query);
  const body = await response.text();
  const data = flureedb.bodyParser(body);
  let arr = [];
  if(!data){
    return []
  }else if (Array.isArray(data)) {
    arr = data;
  } else {
    arr = [data];
  }
  return arr.map((a) => a['budget'])
    ? arr
        .map((a) => a['budget'])
        .flat()
        .map((b) => b['_id'])
    : [];
}

module.exports = {
  queryBudgetSubject,
  findBudgetIdsBySubjectInclude,
  findPointIdsByBudgetId,
};
