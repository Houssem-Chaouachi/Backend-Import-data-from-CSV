const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/bd');
const cors = require('cors');
const { env } = require('process');
require('dotenv').config()
const port = 3000

console.log(process.env.USER_NAME);

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})