const express = require('express')
const router = express.Router();

const Product = require("../models/model.product");
const Login = require("../models/model.login");
const Cart = require('../models/model.cart');

// router.post('/', async (req, res) => {
//     try {
//         const products = await Product.create(req.body);
//         res.send(products);
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// })



router.get('/', async (req, res) => {
    try {
        const cartCount = await Cart.find().lean().exec();
        let sum1 = 0; 
        cartCount.forEach((el => {
            sum1 += el.count;
        }))

        const checkLogin = await Login.find().lean().exec();
        console.log(checkLogin.length)
        const checkLogin1 = checkLogin[0];
        if (checkLogin.length != 0) {
            const products = await Product.find().lean().exec();
            res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
        } else {
            const products = await Product.find().lean().exec();
            let checkLogin1 = 'Please Login';
            res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
        }

        // const products = await Product.find().lean().exec();
        // return res.status(200).render('product/ProductPage', {products})
    } catch (err) {
        res.status(400).send(err.message);
    }
})

//Filter by High to Low
router.get('/htl', async (req, res) => {
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
            
            const products = await Product.find().sort({price: -1}).lean().exec();
            res.render('product/ProductPage', {products, checkLogin1, sum1 });
        } else {
            const products = await Product.find().sort({price: -1}).lean().exec();
            let checkLogin1 = 'Please Login';
            res.render('product/ProductPage', {products, checkLogin1, sum1 });
        }

        // const products = await Product.find().sort({price: -1}).lean().exec();
        // // const products = await Product.find().lean().exec();
        // console.log("hello",products);
    } catch (err) {
        res.status(400).send(err.message);
    }
})


//Filter by Low to High
router.get('/lth', async (req, res) => {
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
            const products = await Product.find().sort({price: 1}).lean().exec();
            res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
        } else {
            const products = await Product.find().sort({price: 1}).lean().exec();
            let checkLogin1 = 'Please Login';
            res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
        }


        // const products = await Product.find().sort({price: 1}).lean().exec();
        // // const products = await Product.find().lean().exec();
        // return res.status(200).render('product/ProductPage', {products})
    } catch (err) {
        res.status(400).send(err.message);
    }
})



//Filter by brand
router.get('/:name', async (req, res) => {
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
            const pr = await Product.find().lean().exec();
            let products = pr.filter((el) => {
                return el.brand == req.params.name;
            })
            res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
        } else {
            const pr = await Product.find().lean().exec();
            let products = pr.filter((el) => {
                return el.brand == req.params.name;
            })
            let checkLogin1 = 'Please Login';
            res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
        }


        // const pr = await Product.find().lean().exec();
        // let products = pr.filter((el) => {
        //     return el.brand == req.params.name;
        //  })
        // return res.status(200).render('product/ProductPage', {products})
    } catch (err) {
        res.status(400).send(err.message);
    }
})

//Filter by price
router.get('/pr/:id', async (req, res) => {
    try {
        const cartCount = await Cart.find().lean().exec();
        let sum1 = 0; console.log("cartCount.length", )
        cartCount.forEach((el => {
            sum1 += el.count;
        }))
        

        console.log(req.params.id)
        // let maxPrice = +req.params.id + 100;
        // console.log(req.params.id, maxPrice)
        if (+req.params.id == 100) {
            const checkLogin = await Login.find().lean().exec();
            console.log(checkLogin.length)
            const checkLogin1 = checkLogin[0];
            if (checkLogin.length != 0) {
                const products = await Product.find({ $and: [{ price: {$gte: 100}}, { price: {$lte: 200}}] }).lean().exec();
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            } else {
                const products = await Product.find({ $and: [{ price: {$gte: 100}}, { price: {$lte: 200}}] }).lean().exec();   
                let checkLogin1 = 'Please Login';
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            }
        } else if (+req.params.id == 200) {
            const checkLogin = await Login.find().lean().exec();
            console.log(checkLogin.length)
            const checkLogin1 = checkLogin[0];
            if (checkLogin.length != 0) {
                const products = await Product.find({ $and: [{ price: {$gte: 200}}, { price: {$lte: 300}}] }).lean().exec();
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            } else {
                const products = await Product.find({ $and: [{ price: {$gte: 200}}, { price: {$lte: 300}}] }).lean().exec();   
                let checkLogin1 = 'Please Login';
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            }
        } else if (+req.params.id == 300) {
            const checkLogin = await Login.find().lean().exec();
            console.log(checkLogin.length)
            const checkLogin1 = checkLogin[0];
            if (checkLogin.length != 0) {
                const products = await Product.find({ price: { $gte: 300 } }).lean().exec();
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            } else {
                const products = await Product.find({ price: { $gte: 300 } }).lean().exec();   
                let checkLogin1 = 'Please Login';
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            }
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})


//Filter by Discount
router.get('/ds/:id', async (req, res) => {
    try {
        const cartCount = await Cart.find().lean().exec();
        let sum1 = 0; console.log("cartCount.length", )
        cartCount.forEach((el => {
            sum1 += el.count;
        }))

        console.log(req.params.id)
        // let maxPrice = +req.params.id + 100;
        // console.log(req.params.id, maxPrice)
        if (+req.params.id == 10) {
            const checkLogin = await Login.find().lean().exec();
            console.log(checkLogin.length)
            const checkLogin1 = checkLogin[0];
            if (checkLogin.length != 0) {
                const products = await Product.find({ $and: [{ discount: {$gte: 10}}, { discount: {$lte: 20}}] }).lean().exec();
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            } else {
                const products = await Product.find({ $and: [{ discount: {$gte: 10}}, { discount: {$lte: 20}}] }).lean().exec();   
                let checkLogin1 = 'Please Login';
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            }
            
        } else if (+req.params.id == 20) {
            const checkLogin = await Login.find().lean().exec();
            console.log(checkLogin.length)
            const checkLogin1 = checkLogin[0];
            if (checkLogin.length != 0) {
                const products = await Product.find({ $and: [{ discount: {$gte: 20}}, { discount: {$lte: 30}}] }).lean().exec();
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            } else {
                const products = await Product.find({ $and: [{ discount: {$gte: 20}}, { discount: {$lte: 30}}] }).lean().exec();   
                let checkLogin1 = 'Please Login';
                res.status(200).render('product/ProductPage', {products, checkLogin1, sum1 });
            }
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})


module.exports = router;



// //Filter by price
// router.get('/pr/:id', async (req, res) => {
//     try {
//         const checkLogin = await Login.find().lean().exec();
//         console.log(checkLogin.length)
//         const checkLogin1 = checkLogin[0];
//         if (checkLogin.length != 0) {
            
//             res.status(200).render('product/ProductPage', {products, checkLogin1 });
//         } else {

//             let checkLogin1 = 'Please Login';
//             res.status(200).render('product/ProductPage', {products, checkLogin1 });
//         }



//         console.log(req.params.id)
//         // let maxPrice = +req.params.id + 100;
//         // console.log(req.params.id, maxPrice)
//         if (+req.params.id == 100) {
//             const checkLogin = await Login.find().lean().exec();
//             console.log(checkLogin.length)
//             const checkLogin1 = checkLogin[0];
//             if (checkLogin.length != 0) {
//                 const products = await Product.find({ $and: [{ price: {$gte: 100}}, { price: {$lte: 200}}] }).lean().exec();
//                 res.status(200).render('product/ProductPage', {products, checkLogin1 });
//             } else {
//                 const products = await Product.find({ $and: [{ price: {$gte: 100}}, { price: {$lte: 200}}] }).lean().exec();   
//                 let checkLogin1 = 'Please Login';
//                 res.status(200).render('product/ProductPage', {products, checkLogin1 });
//             }



//                 const products = await Product.find({ $and: [{ price: {$gte: 100}}, { price: {$lte: 200}}] }).lean().exec();
//                 return res.status(200).render('product/ProductPage', {products})
            
//         } else if (+req.params.id == 200) {
//             const products = await Product.find({ $and: [{ price: {$gte: 200}}, { price: {$lte: 300}}] }).lean().exec();
//             return res.status(200).render('product/ProductPage', {products})
//         } else if (+req.params.id == 300) {
//             const products = await Product.find({ price: { $gte: 300 } }).lean().exec();
            
//             return res.status(200).render('product/ProductPage', {products})
//         }
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// })