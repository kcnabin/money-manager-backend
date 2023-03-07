const express = require('express')
const incomeListRouter = require('./routes/incomeList')

const app = express()

app.use((req, res, next) => {
  const { method, path } = req

  console.log('----------------------------------')
  console.log(`${method} request to ${path}`)
  next()
})

app.use('/api/incomeList', incomeListRouter)


app.get('/', (req, res) => {
  const greetings = 'Welcome to Express App'

  try {
    res.json({
      initialMsg: greetings
    })
  } catch (e) {
    console.log(e)

  }
})

app.get('/about', (req, res) => {
  res.json({
    author: 'Nabin KC'
  })
})

app.use((req, res, next) => {
  console.log('request to unknown endpoint')
  res.status(404).json({
    error: 'endpoint unknown'
  })
})

module.exports = app