const budgetModel = require('../budget/budget.model');

module.exports = {
  queryBudgetSubject: async (season) => {
    const budgets = await budgetModel.queryBudgetSubject(season);
    return budgets;
  },

  
};
