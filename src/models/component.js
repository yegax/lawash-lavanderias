const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
  original_id: Number,
  name: String,
  images: {
    thumb1: String,
  },
  lang: {
    a: String,
    b: String,
    c: String
  },
  info: {
    about: String,
    desc: String,
    descb: String
  }
}, {
  timestamps: {createdAt: true, updatedAt: true},
})

const Component = mongoose.model('Component', componentSchema)

module.exports = Component
