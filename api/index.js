//SETUP FOR DOTENV
require('dotenv').config()
import app from './app';
var mongoose = require('mongoose');


//SETUP FOR MONGOOSE
mongoose.Promise = global.Promise;


//PORT FOR APP
const port = process.env.APP_PORT || 9000;

//const mongodb = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
const mongodb = 'mongodb+srv://ttpuser:fElG84JrS5o5aI6F@cluster0-cvu20.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongodb,{useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true})
.then(() => {  
    console.log("Connected to db succesfully")
    app.listen(port,() => {
        console.log(`Server running on http://localhost:${port}`);
    })
})
.catch(err => console.log(err));
