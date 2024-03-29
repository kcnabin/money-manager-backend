require('dotenv').config()
const MONGODB_ADDRESS = process.env.MONGODB_ADDRESS

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const incomeListRouter = require('./routes/income/incomeListRouter')
const incomeRecordsRouter = require('./routes/income/incomeRecordsRouter')
const expensesListRouter = require('./routes/expenses/expensesListRouter')
const expensesRecordsRouter = require('./routes/expenses/expensesRecordsRouter')
const loginRouter = require('./routes/login/loginRouter')
const userRouter = require('./routes/user/userRouter')
const practiceRouter = require('./routes/practice/practiceRouter')

const connectToDB = async () => {
  await mongoose.connect(MONGODB_ADDRESS)
  console.log('Connected to local MongoDB')
}

try {
  connectToDB()
} catch (e) {
  console.log('Error connecting to local mongoDB')
}

app.use((req, res, next) => {
  console.log("----------------------------------")
  console.log(`${req.method} request to ${req.path}`)
  next()
})

app.use('/api/incomeList', incomeListRouter)
app.use('/api/incomeRecords', incomeRecordsRouter)
app.use('/api/expensesList', expensesListRouter)
app.use('/api/expensesRecords', expensesRecordsRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/practice', practiceRouter)

app.get("/", (req, res) => {
  const greetings = "Welcome to Express App"

  res.send({
    "initialMsg": greetings
  })
})

app.use((req, res, next) => {
  console.log("request to unknown endpoint")
  res.status(404).send({
    "error": 'endpoint unknown'
  })
})

module.exports = app