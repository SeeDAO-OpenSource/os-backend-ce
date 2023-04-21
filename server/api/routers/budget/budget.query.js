const COLLECTION_BUDGET = 'budget';
const PREDICATE_SEASON = 'season';

const SELECT_BUDGET_FULL = [
  '*',
  'subject',
  'season',
  'description',
  'proposal',
];

function queryBudgetSubject(season) {
  return {
    select: ['subject'],
    from: COLLECTION_BUDGET,
    where: `${COLLECTION_BUDGET}/${PREDICATE_SEASON} = \"${season}\"`,
  };
}

function queryBudgetIdBySubjectInclude(keyword) {
  return {
    select: [{ '?budget': ['_id'] }],
    from: COLLECTION_BUDGET,
    where: [
      ['?budget', 'budget/subject', '?subject'],
      { filter: [`(re-find (re-pattern "(?i)${keyword}") ?subject)`] },
    ],
  };
}

function queryPointRecordsByBudgetId(ids) {
  return {
    select: [{'point/_budget': [{"_as": "budget"}]}],
    from: ids,
  };
}


module.exports = {
  queryBudgetSubject,
  queryBudgetIdBySubjectInclude,
  queryPointRecordsByBudgetId
};
