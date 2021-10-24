require("dotenv").config();
const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(
        `mongodb+srv://${process.env.DB_MOD}:${process.env.DB_MOD_PASS}@cluster0.l6m01.mongodb.net/purplle?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );
};

module.exports = connect;