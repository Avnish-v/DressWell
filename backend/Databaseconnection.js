const mongoose = require("mongoose");

const connectmongo = () => {
    mongoose.connect("mongodb://localhost:27017/shopping", () => {
        console.log('you are connected');

    })


};

module.exports = connectmongo;