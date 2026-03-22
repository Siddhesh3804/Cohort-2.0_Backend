const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already Exists"],
        required: [true, "Username is Required"]
    },
    email: {
        type: String,
        unique: [true, "Email already Exists"],
        required: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;