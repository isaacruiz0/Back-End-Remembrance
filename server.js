require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT

const app = express()

// Middleware that allows json to be accepted
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(logger('dev'))
app.use(cors())

app.listen(PORT, () => {
    console.log(`we are live on ${PORT}`)
})