const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
// const db = require('./database/bd');
const cors = require('cors');
const user = require('./Api/userApi')
const fileUpload =require('./Api/fileUploadApi')
const { env } = require('process');
require('dotenv').config()
require('./config/passport');
const port = 3000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use('/user', user);
app.use('/file', fileUpload)

var mongoDB = 'mongodb://127.0.0.1/expensya';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(
  ()=>{
    console.log("connected  to db")
    app.listen(3000);
  }

);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = app;
