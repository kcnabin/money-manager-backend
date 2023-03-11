const expensesListRouter = require('express').Router()
const expensesListSchema = require('../../schema/expenses/expensesListSchema')

expensesListRouter.get('/', async (req, res) => {
  try {
    const allExpensesList = await expensesListSchema.find({})
    res.json(allExpensesList)
  } catch (e) {
    res.status(400).json({
      error: 'error fetching expenses list'
    })
  }
})

expensesListRouter.post('/', async (req, res) => {
  const { name } = req.body

  const newRecord = new expensesListSchema({name})

  try {
    const savedRecord = await newRecord.save()
    res.status(201).json(newRecord)
  } catch (e) {
    res.status(400).json({
      error: 'error saving to expenses list'
    })
  }
})

module.exports = expensesListRouter