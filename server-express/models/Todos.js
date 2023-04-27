const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
}, { timestamps: true })

module.exports = mongoose.model('Todos', schema)
