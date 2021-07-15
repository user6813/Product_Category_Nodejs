const express = require('express');
const app = express.Router();
const product = require('./routes/Product')
const category = require('./routes/Category')

require('./db')

app.use('/product',product)
app.use('/category',category)





module.exports = app;