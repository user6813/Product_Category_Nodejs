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
    const {limit , pageno} = req.query
    Category.find({},null,{limit:parseInt(limit),skip:(parseInt(pageno)-1)*parseInt(limit)})
        .then(result => {
            res.send(result);
        }, err => {
            res.send(err);
        })
})

app.get('/:id', (req, res) => {
    Category.find({ _id: req.params.id }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})

app.patch('/:id', (req, res) => {
    const {name} = req.body
        
    Category.updateOne({ _id: req.params.id },{ $set: { name: name } }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})

app.delete('/:id', (req, res) => {
    Category.deleteOne({ _id: req.params.id }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})







module.exports = app;