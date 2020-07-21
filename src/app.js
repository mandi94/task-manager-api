const express = require('express')
require('./db/mongoose')
const userModule= require('./router/user')
const taskModule = require('./router/task')

const app= express()

app.use(express.json())
app.use(userModule)
app.use(taskModule)

module.exports= app

