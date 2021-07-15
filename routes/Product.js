const express = require('express');
const app = express();
const { Product, Category } = require('../model/model')


app.post('/', (req, res) => {
    Product.findOne({ name: req.body.name }).then(result => {
        if (!result) {
            Category.findOne({ name: req.body.category }).then(result => {
                const data = Product({
                    name: req.body.name,
                    category: result._id
                })
                data.save().then(result => {
                    res.send(result)
                }, err => {
                    res.send(err)
                })
            }, err => {
                res.send(err)
            })
        }
        else {
            res.send("Product Allready Exist")
        }
    })
})



app.get('/', (req, res) => {
    Product.find({})
        .populate('category')
        .then(result => {
            res.send(result);
        }, err => {
            res.send(err);
        })
})


app.get('/:name', (req, res) => {
    Product.find({ name: req.params.name })
        .populate('category')
        .then(result => {
            res.send(result);
        }, err => {
            res.send(err);
        })
})

app.patch('/:name', (req, res) => {
    Product.updateOne({ name: req.params.name }, {$set:{ name: req.body.name }}).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})

app.delete('/:name', (req, res) => {
    Product.deleteOne({ name: req.params.name }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})


module.exports = app;
