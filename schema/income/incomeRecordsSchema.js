const mongoose = require('mongoose')

const incomeRecordsSchema = mongoose.Schema({
  dateAdded: {year: Number, month: Number, day: Number},
  category: String,
  subCategory: String,
  title: String,
  amount: Number,
  userId: String
})

incomeRecordsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('incomeRecords', incomeRecordsSchema)