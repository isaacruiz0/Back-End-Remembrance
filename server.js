require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const personController = require('./controllers/personController')
const userController = require('./controllers/userController')

const PORT = process.env.PORT

const app = express()

// Middleware that allows json to be accepted
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(logger('dev'))
app.use(cors())

app.use('/', personController)
app.use('/user', userController)

app.listen(PORT, () => {
    console.log(`we are live on ${PORT}`)
})