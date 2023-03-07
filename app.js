require('dotenv').config()
const express = require('express')

const MONGODB_ADDRESS = process.env.MONGODB_ADDRESS

const app = express()
app.use(express.json())

const incomeListRouter = require('./routes/incomeListRouter')
const incomeRecordsRouter = require('./routes/incomeRecordsRouter')

const mongoose = require('mongoose')

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