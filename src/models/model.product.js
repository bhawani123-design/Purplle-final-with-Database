const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    brand: { type: String, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceWithDis: { type: Number, required: true },
    count: { type: Number, required: true },
}, { versionKey: false })

const Product = mongoose.model('product', productSchema);

module.exports = Product;