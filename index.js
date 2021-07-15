const express = require('express');
const app = express();
const port = 1234;
const bodyParser = require('body-parser');
const router = require('./route')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use('/',router);

app.listen(port,()=>{ console.log('listening on port'+port)})