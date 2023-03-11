const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../../schema/user/userSchema')

const secretKey = 'superSuperSecretKey'

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const doesUserExist = await userSchema.findOne({ username })

    if (doesUserExist) {
      const isPasswordCorrect = await bcrypt.compare(password, doesUserExist.passwordHash)
      
      if (isPasswordCorrect) {
        const token = await jwt.sign(
          {username: doesUserExist.username}, 
          secretKey,
          {expiresIn: 600}
        )

        console.log(`user '${doesUserExist.username}' logged in `)

        res.json({
          username: doesUserExist.username,
          name: doesUserExist.name,
          token
        })

      } else {
        res.status(400).json({
          error: 'incorrect password'
        })
      }

    } else {
      res.status(400).json({
        error: 'user does not exist in db'
      })
    }
  } catch (e) {
    console.log('Error connecting to db', e)
    res.status(400).json({
      error: 'error connecting to db'
    })
  }
  
})

module.exports = loginRouter