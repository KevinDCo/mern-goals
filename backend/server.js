const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// middle ware to read body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// use our routes so we don't bloat up this code
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    
    app.get('*', (req, res) => res.sendFile(path.resolve(
        __dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

//use our middleware errorHandler instead of default
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))