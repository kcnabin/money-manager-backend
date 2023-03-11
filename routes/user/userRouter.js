const userRouter = require('express').Router()
const userSchema = require('../../schema/user/userSchema')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  try {
    const userCheck = await userSchema.findOne({ username })
  
    if (userCheck) {
      console.log('user already in db')
      res.status(400).json({
        error: 'user already in db. Select new username'
      })
      return
    } else {
        try {
          const saltRounds = 10
          const passwordHash = await bcrypt.hash(password, saltRounds)
          const newUser = new userSchema({ username, name, passwordHash })
          const savedUser = await newUser.save()
          
          console.log(`new user '${savedUser.username}' created!`)
          
          res.status(201).json({
            username: savedUser.username,
            name: savedUser.name,
          })
        } catch (e) {
          console.log('Error creating new user')
          console.log(e)
          res.status(400).json({
            error: 'error creating new user'
          })
          return
        }
    }
  } catch (e) {
    console.log(e)
    console.log('Error connecting to db')
    res.status(400).json({
      error: 'Error connecting to db'
    })
  }

})

module.exports = userRouter