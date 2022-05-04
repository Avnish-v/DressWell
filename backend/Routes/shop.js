const express = require("express");
const multer = require("multer");
const path = require("path")
const app = express.Router();
const FetchUser = require("../middleware/FetchUser");
const uuid = require("uuid.v4")
const productModel = require("../models/ShopingModel");
let result = false;
const storageMulter = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/uploads");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filepath = `${id}${ext}`;
        cb(null, filepath);
    },
});
app.use("/uploads", express.static("uploads"));
const upload = multer({ storage: storageMulter });
//! upload from here 
app.post("/backend/store", upload.single('file'), async (req, res) => {
    try {
        const { name, img, brand, price, type, description } = req.body;
        const User = await productModel.create({
            name: req.body.name,
            img: req.file.path,
            brand: req.body.brand,
            gender: req.body.gender,
            price: req.body.price,
            brand: req.body.brand,
            type: req.body.type,
            description: req.body.description
        });
        result = true;
        res.json({ "data": User, result })

    } catch (error) {
        result = false;
        res.json({ error, result })

    }

})
//! category gender
app.get("/men", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "male" })
        res.status(201).json({ "data": user, result })
    } catch (error) {
        result = false
        res.json({ error, result })
    }
})
//! women
app.get("/women", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "female" })
        res.status(201).json({ "data": user, result })
    } catch (error) {
        result = false
        res.json({ error, result })
    }
})
//! kids
app.get("/kids", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "kids" })
        res.status(201).json({ "data": user, result })

    } catch (error) {
        result = false
        res.json({ error, result })
    }
})
//!unisex
app.get("/unisex", async (req, res) => {
    try {
        result = true;
        const user = await productModel.find({ gender: "unisex" })
        res.status(201).json({ "data": user, result })
    } catch (error) {
        result = false
        res.json({ error, result })
    }
})

//! in terms of items all to fetch
app.get("/items", async (req, res) => {
    try {
        const user = await productModel.find();
        res.json({ "data": user });
    } catch (error) {
        res.json({ result, error })
    }
})

//!category --->
// ! jeans
app.get("/jeans", async (req, res) => {
    try {
        const user = await productModel.find({ type: "jeans" });
        res.status(201).json({ "data": user });
    } catch (error) {
        res.json({ error, result });
    }
})
// !shirt 
app.get("/shirt", async (req, res) => {
    try {

        const user = await productModel.find({ type: "shirt" });
        res.status(201).json({ "data": user });
    } catch (error) {
        res.json({ result, error });
    }

})
app.get("/T-shirt", async (req, res) => {
    try {

        const user = await productModel.find({ type: "T-shirt" });
        res.status(201).json({ "data": user });
    } catch (error) {
        res.json({ result, error });
    }

})
//! shoe
app.get("/footwear", async (req, res) => {
    try {
        const user = await productModel.find({ type: "footwear" });
        res.status(201).json({ "data": user });
    } catch (error) {
        res.json({ result, error });
    }
})
//! dress
app.get("/dress", async (req, res) => {
    try {
        const user = await productModel.find({ type: "dress" });
        if (user.gender === "female") {
            res.status(201).json({ "data": user });
        }
    } catch (error) {
        res.json({ result, error });
    }
})
//!bag 
app.get("/bags", async (req, res) => {
    try {
        const user = await productModel.find({ type: "bag" });
        res.status(201).json({ "data": user });
    } catch (error) {
        res.json({ result, error });
    }
})
app.get("/accessories", async (req, res) => {
    try {
        const user = await productModel.find({ type: "accessories" });
        res.status(201).json({ "data": user });
    } catch (error) {
        res.json({ result, error });
    }
})
//! 


module.exports = app;
