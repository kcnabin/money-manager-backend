const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../../schema/user/userSchema')

const secretKey = process.env.SECRETKEY

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const newUser = await userSchema.findOne({ username })

    if (newUser) {
      const isPasswordCorrect = await bcrypt.compare(password, newUser.passwordHash)
      
      if (isPasswordCorrect) {

        const token = await jwt.sign(
          {
            username: newUser.username,
            userId: newUser._id.toString()
          },
          secretKey,
          {expiresIn: 6000}
        )

        console.log(`user '${newUser.username}' logged in `)

        res.json({
          username: newUser.username,
          name: newUser.name,
          userId: newUser._id.toString(),
          token
        })

      } else {
        res.status(400).json({
          error: 'incorrect password'
        })
      }

    } else {
      res.status(400).json({
        error: 'user does not exist in database'
      })
    }
  } catch (e) {
    console.log('Error connecting to db')
    res.status(400).json({
      error: 'Error connecting to db'
    })
  }
  
})

module.exports = loginRouter