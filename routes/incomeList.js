const incomeListRouter = require('express').Router()

incomeListRouter.get('/', (req, res) => {
  const incomeList = {
    incomeList: ['Salary', 'Allowances', 'Interest']
  }

  res.json(incomeList)

})

module.exports = incomeListRouter