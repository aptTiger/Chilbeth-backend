const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    comment: String
});

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        default: process.env.DEFAULT_AUTHOR
    },
    title: {
        type: String,
        required: true
    },
    post: String,
    imageSortHash: {
        type: String,
        default: "default.jpg" // TODO
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: [blogCommentSchema]
});

const workSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        default: process.env.DEFAULT_AUTHOR
    },
    title: {
        type: String,
        required: true
    },
    imageSortHash: {
        type: String,
        required: true,
        default: "default.jpg" // TODO
    },
    desc: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: [blogCommentSchema]
});

const pictureSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        default: process.env.DEFAULT_AUTHOR
    },
    sortingHash: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model("Blog", blogSchema);
mongoose.model("Work", workSchema);
mongoose.model("Picture", pictureSchema);
