
const express = require("express");
const multer = require("multer");
const app = express.Router();
const FetchUser = require("../middleware/FetchUser");
const productModel = require("../models/ShopingModel");
const storageMulter = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
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




app.post("/backend", upload.single("file"), FetchUser, async (req, res) => {
    const { name, img, brand, price, type, description } = req.body;
    const User = await productModel.create({
        name: req.body.name,
        img: req.file.path,
        brand: req.body.brand,
        price: req.body.price,
        type: req.body.type,
        description: req.body.description
    });
    res.json({ User })
})
app.get("/jeans", async (req, res) => {
    const user = await productModel.find();
    res.json({ "data": user });

})



module.exports = app;
