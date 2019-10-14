/*
    MODEL: USER.
    CONTAINS DEFAULT SCHEMA STRUCTURE FOR USER MODEL
*/

'use strict'

var mongoose =  require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var UserSchema = Schema({
    first_name: {type:String,required: [true, 'Please put your first name']}, //FIRST NAME OF THE USER (REQUIRED)
    last_name: {type:String,required: [true, 'Please put your last name']}, //LAST NAME OF THE USER (REQUIRED)
    email: {type:String,unique:[true,'The email submitted exists'],required: [true, 'Please put a valid email']},  //NEEDS AN EMAIL, CAN'T REPEAT EMAIL
    password: {type:String}  //PASSWORD OF THE USER
});

UserSchema.pre('save', function(next) {
    var user = this;

    //USER SCHEMA HOOK BEFORE SAVE, THAT GENERATES AN ENCRYPTED PASSWORD USING BCRYPTJS
    bcrypt.genSalt(Number(process.env.PASSWORD_SALT_FACTOR), function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, Number(process.env.PASSWORD_SALT_FACTOR), function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);