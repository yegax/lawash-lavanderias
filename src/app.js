"use strict"

global.__basedir = __dirname

// imports
const express = require('express')

const ejs = require('ejs');

// local imports
const util = require(__basedir + '/helpers/util')

// get config
const config = require(__basedir + '/config')
const {
  PORT: port,
} = config

// connect to the database
require(__basedir + '/helpers/mongoose')

// start express application
console.log(`starting application on port ${port}`)

// preparing express app
const app = express()

  // NEW: Set ejs as view engine
  app.set('view engine', 'ejs')

  // NEW: expose style folder
  app.use('/public', express.static('public'));


// Parse incoming json
app.use(express.json({ limit: '50mb' }))
// CORS
const cors = require('cors')
const Empleos = require('./models/empleos')
app.use(cors())


// Routers
const empleosRouter = require(__basedir + '/routers/hero')
app.use(empleosRouter)


app.get('/', async (req, res) => {
  res.render("homepage.ejs", {
    empleos: empleosRouter,
  })
})

  // Route for specifyng hero list page.
   app.get('empleos/:page', async (req, res) => {
    var perPage = 5
    var page = req.params.page || 1
    Empleos
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, empleosRouter) {
          Empleos.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('empleos.ejs', {
                    empleos: empleosRouter,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
      });

// 404 Page
app.get('*', (req, res) => {
  res.render("404.ejs")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    err: "Something broke!"
  })
})

app.listen(port, () => {
  console.log(`\nServer is up:\n\n\thttp://localhost:${port}\n\n`)
})

