const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  hero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hero'
  },
  text: {
    type: String,
    trim: true,
    required: true,
  }
}, {
  timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment