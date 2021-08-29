const express = require('express');
const router = express.Router();


const Price = require('../models/model.price')
const Login = require('../models/model.login');

router.get('/', async (req, res) => {
    try {
        const productDetail = await Price.find().lean().exec();
        let priceDetail = productDetail[0];
        const checkLogin = await Login.find().lean().exec();
        const checkLogin1 = checkLogin[0];
        return res.status(200).render('payment/payment.ejs', {priceDetail, checkLogin1});
    } catch (err) {
        res.status(400).send(err.message);
    }
})



module.exports = router;