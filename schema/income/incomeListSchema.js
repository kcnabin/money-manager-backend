const mongoose = require('mongoose')

const incomeListSchema = mongoose.Schema({
  name: String,
})

incomeListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('incomeList', incomeListSchema)

