const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : [true, "With this Email user account already exists"]
    },
    password : String
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;