const express = require("express");
const userModel = require("../models/user.model")
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req,res) => {
    const {name, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({email});
    if(isUserAlreadyExists){
        res.status(409).json({
            message : "User already exists with this Email"
        });
    }

    const user = await userModel.create({
        name, email, password : crypto.createHash("md5").update(password).digest("hex")
    });

    const Token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET, {expiresIn : "1h"});

    res.cookie("token", Token);

    res.status(201).json({
        message : "User Registered Successfully",
        user,
        Token
    })
});

authRouter.get("/getUser", async (req,res) => {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.json({
        name : user.name,
        email  : user.email
    });
});

authRouter.post("/login", async (req,res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        res.status(404).json({
            message :"User not found with this Email"
        });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");
    const isPasswordMatched = await user.password === hash
    if(!isPasswordMatched){
        res.status(401).json({
            message :"Invalid Password"
        });
    }

    const Token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, {expiresIn : "1h"});

    res.cookie("token", Token);

    res.status(200).json({
        message : "User Logged in Successfully",
        user : {
            name : user.name,
            email : user.email
        }
    });
});
module.exports = authRouter;