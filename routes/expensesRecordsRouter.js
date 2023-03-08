const expensesRecordsRouter = require('express').Router()
const expensesRecordsSchema = require('../schema/expensesRecordsSchema')

expensesRecordsRouter.get('/', async (req, res) => {
  try {
    const allExpensesRecords = await expensesRecordsSchema.find({})
    res.json(allExpensesRecords)
  } catch (e) {
    res.json({
      error: 'error fetching all expenses record'
    })
  }
})

expensesRecordsRouter.post('/', async (req, res) => {
  const sentRecord = req.body

  const newRecord = new expensesRecordsSchema(sentRecord)
  try {
    const savedRecord = await newRecord.save()
    res.status(201).json(savedRecord)
  } catch (e) {
    res.status(400).json({
      error: 'error saving new expenses record'
    })
  }
})

module.exports = expensesRecordsRouter