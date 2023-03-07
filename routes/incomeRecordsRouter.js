const incomeRecordsRouter = require('express').Router()
const incomeRecordsSchema = require('../schema/incomeRecordsSchema')

incomeRecordsRouter.get('/', async (req, res) => {
  try {
    const allIncomeRecords = await incomeRecordsSchema.find({})
    res.json(allIncomeRecords)
  } catch (e) {
    res.status(400).json({
      error: 'error fetching all income records'
    })
  }
})

incomeRecordsRouter.post('/', async (req, res) => {
  const sentRecord = req.body
  const newRecord = new incomeRecordsSchema(sentRecord)
  try {
    const savedRecord = await newRecord.save()
    res.status(201).json(savedRecord)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error saving new income record'
    })
  }
})

module.exports = incomeRecordsRouter
