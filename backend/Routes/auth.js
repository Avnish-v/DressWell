const express = require("express");
const app = express.Router();
const user = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/FetchUser");

//! end point  for the creating the user the cerdinatial
app.post("/create", async (req, res) => {
    let result = false;
    const { username, password, address, phone, email } = req.body;
    try {
        let data = await user.findOne({ email });
        if (data !== null) {
            return res.status(200).json({ result, error: "User exist " })

        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);
        data = await user.create({
            username: username,
            password: secpass,
            address: address,
            phone: phone,
            email: email,
        });

        let ID = {
            id: data.id
        }
        const AuthToken = jwt.sign(ID, jwt_sc);
        result = true;
        res.status(201).json({ result, AuthToken })



    } catch (error) {
        result = false;
        res.json({ result, error })
    }
})
//!login ---->
app.post("/login", async (req, res) => {
    let result = false;
    const { password, email } = req.body;
    try {
        let response = await user.findOne({ email })
        const compare = await bcrypt.compare(password, response.password);
        if (!compare) {
            res.status(400).json({ result, "error": "please enter correct cardential" });
        } else {
            result = true;
            let ID = {
                id: response.id
            }
            const AuthToken = jwt.sign(ID, jwt_sc);
            res.json({ result, AuthToken })
        }
    } catch (error) {
        result = false
        res.status(400).json({ result, "error": "please enter correct cardential" })
    }
})
//! change password ---->  but there is the issue this service is only valid when the user is logged in ....>
app.put("/change", fetchUser, async (req, res) => {
    try {
        const { password, email } = req.body;
        const check = await user.findOne({ email });
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);
        const update = await user.updateOne({ email }, { $set: { password: secpass } })

        if (update) {
            result = true;
            res.status(201).json({ msg: "updation is done successfully", result })
        } else {
            result = false;
            res.status(400).json({ result })
        }
    } catch (error) {
        res.status(404).json({ error })
    }
})


module.exports = app;