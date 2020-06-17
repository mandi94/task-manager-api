const express = require('express')
require('./db/mongoose')
const userModule= require('./router/user')
const taskModule = require('./router/task')

const app= express()
const port=process.env.PORT

app.use(express.json())
app.use(userModule)
app.use(taskModule)

app.listen(port,()=>{   
    console.log(' Server is up on port ' +port)
})

