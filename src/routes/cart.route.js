const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const send = require("send");
const urlencodedParser = bodyParser.urlencoded({ extended: false });



const Product = require('../models/model.product')
const Cart = require('../models/model.cart')
const Price = require('../models/model.price')

router.post('/priceCollection',urlencodedParser, async (req, res) => {
    try {
        
        await Price.deleteMany();
        await Price.create(req.body);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await Cart.find().lean().exec();
        res.send(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
})



// Adding product in cart collection
router.get('/:id', async (req, res) => {
    try {
        let f = false;
        let count;
        const product = await Product.findById(req.params.id).lean().exec();
        
        // res.send(product);
        const allCartProduct = await Cart.find().lean().exec();
        const pr = allCartProduct.filter((el) => {
            if (product.name == el.name) {
                f = true;
                count = el.count;
            }
        })
        if (f) {
            const updateIdInDb = await Cart.findByIdAndUpdate(req.params.id, { count: count + 1 }, { new: true }).lean();
            // res.send(updateIdInDb);
        }
        else {
            const createNewProduct = await Cart.create(product);
            // res.send(createNewProduct);
        }
        return res.status(200).redirect('/product');

    } catch (err) {
        res.status(400).send(err.message)
    }
})




module.exports = router;