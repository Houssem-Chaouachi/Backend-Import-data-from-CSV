const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/bd');
const cors = require('cors');
const user = require('./Api/userApi')
const { env } = require('process');
require('dotenv').config()
require('./config/passport');
const port = 3000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use('/user', user);

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})
