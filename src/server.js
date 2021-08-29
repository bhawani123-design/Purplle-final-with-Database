const path = require('path');
const express = require('express');
const connect = require('./configs/db');
const app = new express();
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');


app.use(express.json());


// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../static")))


// const staticPath = path.join(__dirname, "public");
// app.use(express.static(staticPath))

console.log(path.join(__dirname, "../dynamic/views"))

// Register the view engine
app.set("view engine", "ejs");

// For html css setting views on views directrory that is inside the src folder 
// [All  html css file]
app.set("views", path.join(__dirname, "../dynamic/views"));
// For display message on frontend from backend
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
app.use(flash());



const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Home page route
const homeRoute = require('./routes/home.route');
app.use('/', homeRoute);

const productController = require("./routes/product.route");
app.use('/product', productController);

const cartController = require("./routes/cart.route");
app.use('/cart', cartController);

const basketController = require("./routes/basket.route");
app.use('/basket', basketController);

const addressController = require("./routes/address.route");
app.use('/address', addressController);

const paymentController = require("./routes/payment.route");
app.use('/payment', paymentController);

const thankyouController = require("./routes/thankyou.route");
app.use('/thankyou', thankyouController);

const loginController = require("./routes/login.route");
app.use('/login', loginController);

const signupController = require("./routes/signup.route");
app.use('/signup', signupController);






app.listen(2345, async () => {
    await connect();
    console.log('Listening on port 2345');
})


// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
