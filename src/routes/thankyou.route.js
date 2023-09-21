const express = require('express');
const router = express.Router();


const Login = require('../models/model.login');
const Signup = require("../models/model.signup");


router.get('/', async (req, res) => {
    try {
        const checkLogin = await Login.find().lean().exec();
        // console.log(checkLogin.length)
        const checkLogin1 = checkLogin[0];
        if (checkLogin.length != 0) {
            const currentUser = await Login.find().lean().exec();
            const userProduct = await Signup.findById(currentUser[0]._id);
            let prevHistory = userProduct.oreder_history;
            let orderHistory = [];
            let recentOrder = [];
            const date = new Date().toLocaleDateString();
            orderHistory.push(...prevHistory);
            for (let i = 0; i < userProduct.holding_product.length; i++) {
                let name = userProduct.holding_product[i];
                let count = userProduct.holding_product_cnt[i];
                orderHistory.push({ name, count, date });
                recentOrder.push({name, count})
            }


            await Signup.findByIdAndUpdate(userProduct._id, {
                oreder_history: orderHistory,
                recent_order: recentOrder,
                holding_product: [],
                holding_product_cnt: []
            });
            const orderProducts = await Signup.findById(userProduct._id).lean().exec();
            const products = orderProducts.recent_order;

            res.status(200).render('thankyou/thankYouPage.ejs', { products, checkLogin1 });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;