const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{ type: String},
    category:{ type:mongoose.Schema.Types.ObjectId,ref:'Category' }
})

const categorySchema = mongoose.Schema({
    name:{ type: String}
})


const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);


module.exports = {Product,Category}