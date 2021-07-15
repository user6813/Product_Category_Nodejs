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
    const {limit , pageno} = req.query
    Product.find({},null,{limit:parseInt(limit),skip:(parseInt(pageno)-1)*parseInt(limit)})
        .populate('category')
        .then(result => {
            res.send(result);
        }, err => {
            res.send(err);
        })
})


app.get('/:id', (req, res) => {
    Product.find({ _id: req.params.id })
        .populate('category')
        .then(result => {
            res.send(result);
        }, err => {
            res.send(err);
        })
})

app.patch('/:id', (req, res) => {
    const {name} = req.body 

    Product.updateOne({ _id: req.params.id }, {$set:{ name: name }}).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})

app.delete('/:id', (req, res) => {
    Product.deleteOne({ _id: req.params.id }).then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
})


module.exports = app;
