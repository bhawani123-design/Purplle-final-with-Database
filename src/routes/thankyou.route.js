const express = require('express');
const router = express.Router();


const Price = require('../models/model.price');
const Cart = require('../models/model.cart');
const Login = require('../models/model.login');


// const checkLogin = await Login.find().lean().exec();
//         console.log(checkLogin.length)
//         const checkLogin1 = checkLogin[0];
//         if (checkLogin.length != 0) {
//             const products = await Product.find().lean().exec();
//             res.status(200).render('product/ProductPage', {products, checkLogin1 });
//         } else {
//             const products = await Product.find().lean().exec();
//             let checkLogin1 = 'Please Login';
//             res.status(200).render('product/ProductPage', {products, checkLogin1 });
//         }


router.get('/', async (req, res) => {
    try {
        const checkLogin = await Login.find().lean().exec();
        console.log(checkLogin.length)
        const checkLogin1 = checkLogin[0];
        if (checkLogin.length != 0) {
            const products = await Cart.find().lean().exec();
            res.status(200).render('thankyou/thankYouPage.ejs', { products, checkLogin1 });
        } else {
            const products = await Cart.find().lean().exec();
            let checkLogin1 = 'Please Login';
            res.status(200).render('thankyou/thankYouPage.ejs', { products,  checkLogin1 });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.get('/remove', async (req, res) => {
    try {
        await Cart.deleteMany().lean().exec();
        // return res.send(products);
        return res.status(200).redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
})



module.exports = router;