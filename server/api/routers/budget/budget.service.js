const budgetModel = require('./budget.model');

module.exports = {
  queryBudgetSubject: async (season) => {
    const budgets = await budgetModel.queryBudgetSubject(season);
    return budgets;
  },

  
};
