const mongoose = require('mongoose')

const empleosSchema = new mongoose.Schema({
  original_id: Number,
  name: String,
  info: {
    about: String,
    desc: String,
    reqs: String
  },
  sucursal: String,
  aplicacion: String,
  tareas: {
    t1: String,
    t2: String,
    t3: String,
    t4: String,
    t5: String
  },
}, {
  timestamps: {createdAt: true, updatedAt: true},
})

const Empleos = mongoose.model('Empleos', empleosSchema)

module.exports = Empleos
