const incomeRecordsSchema = require('../../schema/income/incomeRecordsSchema')
const mongoose = require('mongoose')
const practiceRouter = require('express').Router()

practiceRouter.get('/:userId', async (req, res) => {
  const sentUserId = req.params.userId

  try {
    const records = await incomeRecordsSchema.find({userId: sentUserId})
    res.json(records)
  } catch (e) {
    console.log(e)
  }
})

module.exports = practiceRouter