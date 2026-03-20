const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const jwt = require("jsonwebtoken");
 
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req,res){
    console.log(req.body, req.file);

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
    console.log(decoded);

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

module.exports = {
    createPostController
}