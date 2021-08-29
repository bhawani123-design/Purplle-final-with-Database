const express = require('express');
const router = express.Router();


const Product = require('../models/model.product')
const Cart = require('../models/model.cart')
const Login = require("../models/model.login");


router.get('/', async (req, res) => {
    try {
        const checkLogin = await Login.find().lean().exec();
        console.log(checkLogin.length)
        const checkLogin1 = checkLogin[0];
        if (checkLogin.length != 0) {
            const products = await Cart.find().lean().exec();
            res.status(200).render('basket/basket.ejs', {products, checkLogin1 });
        } else {
            const products = await Cart.find().lean().exec();
            let checkLogin1 = 'Please Login';
            res.status(200).render('basket/basket.ejs', {products, checkLogin1 });
        }


    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.get('/remove/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        const product = await Cart.findById(req.params.id).lean().exec();
        let count = product.count;
        if (count > 1) {
            await Cart.findByIdAndUpdate(req.params.id, { count: count-1 }, { new: true }).lean().exec();
            return res.status(200).redirect('/basket');
        } else {
            await Cart.findByIdAndDelete(req.params.id).lean();
            return res.status(200).redirect('/basket');
        }
        
    } catch (err) {
        res.status(400).send(err.message);
    }
})


module.exports = router;