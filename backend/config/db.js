const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

// add the app uri copied from the mongodb site in env file as MONGO_URI

// all mongoose funtions are asynchronous
// now all resources that we have will be in model folder
const connectDB = async () => {
    try {
        //connects to the mentioned db in env file
        const conn = await mongoose.connect(process.env.MONGO_URI)
        
        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1)        
    }
}

module.exports = connectDB