const incomeRecordsRouter = require('express').Router()
const incomeRecordsSchema = require('../../schema/income/incomeRecordsSchema')

incomeRecordsRouter.get('/', async (req, res) => {
  try {
    const allIncomeRecords = await incomeRecordsSchema.find({})
    console.log('Fetched all income records!')
    res.json(allIncomeRecords)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error fetching all income records'
    })
  }
})

incomeRecordsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const fetchedRecord = await incomeRecordsSchema.findById(id)
    if (fetchedRecord) {
      console.log('Requested record fetched!')
      res.json(fetchedRecord)
    } else {
      console.log('Requested record not found!!!')
      res.json({
        error: 'requested record not found'
      })
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error fetching requested record'
    })
  }
})

incomeRecordsRouter.post('/', async (req, res) => {
  const sentRecord = req.body
  const newRecord = new incomeRecordsSchema(sentRecord)
  try {
    const savedRecord = await newRecord.save()
    console.log('New income record saved!')
    res.status(201).json(savedRecord)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error saving new income record'
    })
  }
})

incomeRecordsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  
  try {
    await incomeRecordsSchema.findByIdAndDelete(id)
    console.log('Record deleted!')
    res.status(204).end()
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error deleting the record'
    })
  }
})

incomeRecordsRouter.patch('/:id', async (req, res) => {
  const id = req.params.id
  const contentToUpdate = req.body
  
  try {
    await incomeRecordsSchema.findByIdAndUpdate(id, contentToUpdate)
    console.log('Requested record updated!')
    const updatedRecord = await incomeRecordsSchema.findById(id)
    res.json(updatedRecord)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error updating record'
    })
  }
})

module.exports = incomeRecordsRouter
