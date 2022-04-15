const mongoose = require("mongoose");

const shop = new mongoose.Schema({
    name: { required: true, type: String },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, default: "general" },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

const productModel = mongoose.model("productModel", shop);

module.exports = productModel;