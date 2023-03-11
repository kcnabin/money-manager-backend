const loginRouter = require('express').Router()

loginRouter.post('/', (req, res, next) => {
  const { username, password } = req.body

  res.json({
    username
  })
})

module.exports = loginRouter