const express = require('express');
const app = express.Router();
const { Product, Category } = require('../model/model');



app.post('/', (req, res) => {
    Category.findOne({ name: req.body.name }).then(result => {
        if (!result) {
            Category.create(req.body).then(result => {
                res.send(result);
            }, err => {
                res.send(err)
            })
        }
        else {
            res.send("Category Allready Exist")
        }
    })
})


app.get('/', (req, res) => {
    Category.find({})
        .limit()
        .then(result => {
            res.send(result);
        }, err => {
            res.send(err);
        })
})

app.get('/:name', (req, res) => {
    Category.find({ name: req.params.name }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})

app.patch('/:name', (req, res) => {
    Category.updateOne({ name: req.params.name }, {$set:{ name: req.body.name} }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})

app.delete('/:name', (req, res) => {
    Category.deleteOne({ name: req.params.name }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})







module.exports = app;