const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const jwt = require("jsonwebtoken");
 
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req,res){
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(401).json({
            message: "Token not Provided, Unauthorized access"
        });
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        return res.status(401).json({
            message: "Unauthorized User"
        });
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "Cohort-2/Insta-Clone-Posts"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    });

    res.status(201).json({
        message: "Post Created Successfully",
        post
    });
}

async function getPostController(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Token Invalid"
        });
    }

    const userId = decoded.id;
    const posts = await postModel.find({
        user: userId
    });
    res.status(200).json({
        message: "Posts Fetched Succesfully",
        posts
    });
}

async function getPostDetailsController(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        });
    }
    
    const isValidUser = post.user.toString() == userId;
    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        });
    }

    res.status(200).json({
        message: "Post details fetched Successfully",
        post
    });
}


module.exports = {
    createPostController,
    getPostController, 
    getPostDetailsController
}