const mongoose = require('mongoose');
const { Schema } = mongoose;

const userInfo = new Schema({
    name : String,
    teamName : String,
    position : String,
    id : String,
    password : String,
    email : String,
    approve: String,

},{
    timestamps: true
})

module.exports = mongoose.model('userInfo', userInfo)