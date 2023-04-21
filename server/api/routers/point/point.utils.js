function getWhereFromBudgetIds(ids){
    return {
        union: ids.map((id)=>`budget = ${id}`)
    }
}


module.exports = {
  getWhereFromBudgetIds
};
