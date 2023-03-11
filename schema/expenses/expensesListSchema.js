const mongoose = require('mongoose')

const expensesListSchema = mongoose.Schema({
  name: String
})

expensesListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('expensesList', expensesListSchema)