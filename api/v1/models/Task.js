'use strict'
var mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var TaskSchema = Schema({
    name: {type:String,default: null}, //CAN BE NULL IF NAME ISN'T SPECIFIED
    duration: {type:Number,default:0},
    last_start: {type:Date,default:Date.now},
    paused: {type:Date,default:null},
    createdAt: {type:Date,default:Date.now},
    status: {type:Boolean,default:true}, //TWO STATES true = Running, false = Stopped, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'Please assign the user id']
    },project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    } //CAN HAVE A PROJECT OR NOT
});

module.exports = mongoose.model('Task', TaskSchema);