const express = require("express");
const router = express.Router();

const Login = require("../models/model.login");
const Signup = require("../models/model.signup");

router.get("/", async (req, res) => {
    try {
        const checkLogin = await Login.find().lean().exec();
        // console.log(checkLogin.length);
        const checkLogin1 = checkLogin[0];
        if (checkLogin.length != 0) {
            const currentUser = await Login.find().lean().exec();
            const userProduct = await Signup.findById(currentUser[0]._id);
            let orderHistory = [];

            const orderProducts = await Signup.findById(userProduct._id)
                .lean()
                .exec();
            const products = orderProducts.oreder_history.sort((a, b) => {
                return a.name - b.name;
            });

            res.status(200).render("orderHistory/orderHistory.ejs", {
                products,
                checkLogin1,
            });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
