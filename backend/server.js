const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare') // call it after apiRoutes
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

// bring path module
const path = require('path')

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

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

// Serve frontend

if(process.env.NODE_ENV === 'production'){
    app.use(express.static( // here we put path of static folder - frontend/build
        path.join(__dirname, '../frontend/build'))) // __dirname = current directory
    
    // '*' means any route apart from above routes
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))


}else{
    app.get('/', (req, res) => res.send('Please, set to production'));
}


app.use(errorHandler) // override default error handler


app.listen(port , () => console.log(`Server started on port : ${port}`))