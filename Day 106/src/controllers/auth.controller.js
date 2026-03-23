const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController (req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User Already Exists, " + (isUserAlreadyExists.email == email ? "Email Already Exists" : "Username Already Exists")
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username, email, password: hash, bio, profileImage
    });

    const Token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" });

    res.cookie("jwt_token", Token);

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

async function loginController (req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });
    if (!user) {
        res.status(404).json({
            message: "User Not Found"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        });
    }

    const Token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
    { expiresIn: "1d"}
    );

    res.cookie("token", Token);

    res.status(200).json({
        message: "User LoggedIn Successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

module.exports = {
    registerController,
    loginController
}