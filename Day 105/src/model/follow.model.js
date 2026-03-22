const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: [ true, "Follower is Required" ]
    },
    followee: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: [ true, "Followee is Required"]
    }    
}, {
    timestamps: true
});

const followModel = mongoose.model("Follows", followSchema);

module.exports = followModel;