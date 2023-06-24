const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const port = process.env.PORT || 5000

const app = express()

// middle ware to read body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// use our routes so we don't bloat up this code
app.use('/api/goals', require('./routes/goalRoutes'))

//use our middleware errorHandler instead of default
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))