const expensesRecordsRouter = require('express').Router()
const expensesRecordsSchema = require('../../schema/expenses/expensesRecordsSchema')
const { getTokenFromRequest } = require('../../helper/getTokenFromRequest')
const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRETKEY
const userSchema = require('../../schema/user/userSchema')

expensesRecordsRouter.get('/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await userSchema.findById(userId)
    console.log('user exists in database')
    
  } catch (e) {
    console.log('user not found in db')
    res.status(400).end({
      error: 'user not found in db'
    })
    return
  }

  try {
    const fetchedRecord = await expensesRecordsSchema.find({userId})

    console.log('Records fetched for user')
    res.json(fetchedRecord)

  } catch (e) {
    console.log('error fetching records')
    res.status(400).json({
      error: 'error fetching records'
    })
  }
})

expensesRecordsRouter.post('/', async (req, res) => {
  let decodedToken = ''
  try {
    const token = await getTokenFromRequest(req)
    decodedToken = await jwt.verify(token, SECRETKEY)
    

  } catch (e) {
    console.log('token expired or not valid')
    res.status(400).json({
      error: 'token expired or not valid'
    })
    return
  }

  const newRecord = new expensesRecordsSchema({
    ...req.body, 
    userId: decodedToken.userId
  })

  try {
    const savedRecord = await newRecord.save()
    console.log(`New expenses record saved by user '${decodedToken.username}'`)
    res.status(201).json(savedRecord)

  } catch (e) {
    console.log('error saving new record to db')
    res.status(400).json({
      error: 'error saving new record to db'
    })
  }
})

expensesRecordsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  
  try {
    const recordToDelete = await expensesRecordsSchema.findById(id)

    if (recordToDelete) {
      console.log('record exists in database')
    }
  } catch (e) {
    console.log('record does not exist in database')
    res.status(400).json({
      error: 'record does not exist in database'
    })
    return
  }

  let decodedToken = ''
  try {
    const token = await getTokenFromRequest(req)
    decodedToken = await jwt.verify(token, SECRETKEY)

  } catch (e) {
    console.log('token expired or not valid')
    res.status(400).json({
      error: 'token expired or not valid'
    })
    return
  }

  const recordToDelete = await expensesRecordsSchema.findById(id)

  if (recordToDelete.userId === decodedToken.userId) {
    
    try {
      await expensesRecordsSchema.findByIdAndDelete(id)
      console.log('Record deleted!')
      res.status(204).end()

    } catch (e) {
      console.log('error deleting the record from database')
      res.status(400).json({
        error: 'error deleting the record from database'
      })
      return
    }

  } else {
    console.log('Not authorized to delete!')
    res.status(400).json({
      error: 'Not authorized to delete!'
    })
  }

})

expensesRecordsRouter.patch('/:id', async (req, res) => {
  const id = req.params.id
  const contentToUpdate = req.body
  
  try {
    await expensesRecordsSchema.findByIdAndUpdate(id, contentToUpdate)
    console.log('Requested record updated!')
    const updatedRecord = await expensesRecordsSchema.findById(id)
    res.json(updatedRecord)

  } catch (e) {
    console.log('error updating record')
    res.status(400).json({
      error: 'error updating record'
    })
  }
})

module.exports = expensesRecordsRouter
