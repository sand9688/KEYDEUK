const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8080
const bodyParser = require('body-parser');

connectDB()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/test', require('./routes/test')) 
app.use('/api/user', require('./routes/userInforotuer'))

app.use(errorHandler)

app.listen(port, () => 
    console.log(`Server started on port ${port}`)
);