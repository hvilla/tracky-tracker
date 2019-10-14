'use strict'// Cargamos el módulo de mongoose


var mongoose =  require('mongoose');// Usaremos los esquemas
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;// Creamos el objeto del esquema y sus atributos
const bcrypt = require('bcrypt');

var UserSchema = Schema({
    first_name: {type:String,required: [true, 'Please put your first name']},
    last_name: {type:String,required: [true, 'Please put your last name']},
    email: {type:String,unique:[true,'The email submitted exists'],required: [true, 'Please put a valid email']},
    password: {type:String}
});

UserSchema.pre('save', function(next) {
    var user = this;

    // generate a salt
    bcrypt.genSalt(Number(process.env.PASSWORD_SALT_FACTOR), function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, Number(process.env.PASSWORD_SALT_FACTOR), function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema); // Exportamos el modelo para usarlo en otros ficheros