const expensesRecordsRouter = require('express').Router()
const expensesRecordsSchema = require('../../schema/expenses/expensesRecordsSchema')

expensesRecordsRouter.get('/', async (req, res) => {
  try {
    const allExpensesRecords = await expensesRecordsSchema.find({})
    console.log('Fetched all expenses records!')
    res.json(allExpensesRecords)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error fetching all expenses record'
    })
  }
})

expensesRecordsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const fetchedRecord = await expensesRecordsSchema.findById(id)
    if (fetchedRecord) {
      console.log('Requested record fetched!')
      res.json(fetchedRecord)
    } else {
      console.log('Requested record not found!!!')
      res.status(400).json({
        error: 'error fetching requested record'
      })
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error fetching requested record'
    })
  }
})

expensesRecordsRouter.post('/', async (req, res) => {
  const sentRecord = req.body

  const newRecord = new expensesRecordsSchema(sentRecord)
  try {
    const savedRecord = await newRecord.save()
    console.log('New record saved!')
    res.status(201).json(savedRecord)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error saving new expenses record'
    })
  }
})

expensesRecordsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await expensesRecordsSchema.findByIdAndDelete(id)
    console.log('Record deleted!')
    res.status(204).end()
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error deleting the record'
    })
  }
} )

expensesRecordsRouter.patch('/:id', async (req, res) => {
  const id = req.params.id
  const contentToUpdate = req.body

  try {
    await expensesRecordsSchema.findByIdAndUpdate(id, contentToUpdate)
    console.log('Record updated successfully!')
    const updatedRecord = await expensesRecordsSchema.findById(id)
    res.json(updatedRecord)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: 'error updating the record'
    })
  }
})

module.exports = expensesRecordsRouter