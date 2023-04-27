const express = require('express')
const useRouters = require('./useRouters')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

useRouters(app)

module.exports = app
