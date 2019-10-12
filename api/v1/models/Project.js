'use strict'
var mongoose =  require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var ProjectSchema = Schema({
    name: {type:String,required:[true,'Please put the name of the project']},
    createdAt: {type:Date,default:Date.now},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'Please asign the user id']
    }
});


ProjectSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Project', ProjectSchema);