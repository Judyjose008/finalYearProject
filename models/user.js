const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
// USER SCHEMA
const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

//make a users variable with userschema just above
const User = module.exports = mongoose.model('User', userSchema);
 
//declare function to get data from db by their id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}
// declare function to get data by user name
module.exports.getUserByUserName = function(username, callback){
    const query = {username:username};
    User.findOne(query, callback);
}

//creates the hashed password for storing in database using the bcrypt.js
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err)  throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
