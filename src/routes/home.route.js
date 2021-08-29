const express = require('express');
const Login = require('../models/model.login');
const Cart = require('../models/model.cart');
const router = express.Router();

router.get('/', async(req, res)=> {
    try {
        const cartCount = await Cart.find().lean().exec();
        let sum1 = 0; console.log("cartCount.length", )
        cartCount.forEach((el => {
            sum1 += el.count;
        }))

        const checkLogin = await Login.find().lean().exec();
        console.log(checkLogin.length)
        const checkLogin1 = checkLogin[0];
        if (checkLogin.length != 0) {
            res.status(200).render('index', { checkLogin1, sum1 });
        } else {
            let checkLogin1 = 'Please Login';
            res.status(200).render('index', { checkLogin1, sum1 });
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router;