const incomeListRouter = require('express').Router()
const incomeListSchema = require('../../schema/income/incomeListSchema')

incomeListRouter.get('/', async (req, res, next) => {
  try {
    const allIncomeList = await incomeListSchema.find({})
    res.json(allIncomeList)
  } catch (e) {
    res.status(400).json({
      error: 'error fetching all income list'
    })
  }
})

incomeListRouter.post('/', async (req, res) => {
  const { name } = req.body

  const newIncome = new incomeListSchema({name})
  try {
    const savedIncome = await newIncome.save()
    res.status(201).json(savedIncome)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error saving new income category'
    })
  }
  
})

module.exports = incomeListRouter