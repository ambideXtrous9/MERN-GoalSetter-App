const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide a name']
    },
    email : {
        type : String,
        required : [true, 'Please provide a name'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please provide a name']
    },
},
// timestamps after the schema
{
    timestamps : true 
})

module.exports = mongoose.model('User',userSchema)