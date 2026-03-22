const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image URL is required for Creating a Post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User ID is required for Creating Post"]
    }
});

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;