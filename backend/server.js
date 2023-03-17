const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare') // call it after apiRoutes
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB()


const app = express()


// middleware -> add these to get data from request body
app.use(express.json())
app.use(express.urlencoded({extended : false})) 


// we will not write all the functions here
// define the functions in getRotes for all the routes and their 
// operations in getController and import those here

const goalRoutes = require('./routes/goalRoutes')

app.use('/api/goals', goalRoutes)

app.use(errorHandler) // override default error handler


app.listen(port , () => console.log(`Server started on port : ${port}`))