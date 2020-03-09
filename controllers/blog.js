const mongoose = require('mongoose');
const ifEnter = require('../controllers/checkUser').checkUser;
const Blog = mongoose.model("Blog");

const blogFetchAll = (req, res) => {
    Blog.find()
        .exec((err, blogs) => {
            if (!blogs) {
                return res.status(404)
                    .json({
                        "message": "no blogs"
                    });
            } else if (err) {
                return res.status(404)
                    .json(err);
            }
            res.status(200)
                .json(blogs);
        });
}

const blogReadOne = (req, res) => {
    Blog.findById(req.params.blogid)
        .exec((err, blog) => {
            if (!blog) {
                return res.status(404)
                    .json({ "message": "no Blog" });
            } else if (err) {
                return res.status(404)
                    .json(err);
            }
            res.status(200)
                .json(blog);
        });
}

const blogCreate = function (req, res) {
    ifEnter(req, res, (req, res, author) => { // If JWT was decrypted, and is valid
        Blog.create({
            author: author.email,
            title: req.body.title,
            desc: req.body.desc,
        }, (err, blog) => {
            if (err) {
                res.status(400)
                    .json(err);
            } else {
                res.status(201)
                    .json(blog);
            }
        });
    });
};

const blogUpdateOne = (req, res) => { // If JWT was decrypted, and is valid
    ifEnter(req, res, (req, res, author) => {
        Blog.findById(req.params.blogid)
            .exec((err, blog) => {
                if (!blog) {
                    return res.status(404)
                        .json({ message: "Blog not found" });
                } else if (err) {
                    return res.status(400)
                        .json(err);
                }
                blog.title = req.body.title;
                blog.desc = req.body.desc;
                blog.post = req.body.post;
                blog.save((err, blog) => {
                    if (err) {
                        res.status(404)
                            .json(err);
                    } else {
                        res.status(200)
                            .json(blog);
                    }
                });
            });
    });
}

const blogDeleteOne = (req, res) => {
    ifEnter(req, res, (req, res, author) => {
        const { blogid } = req.params;
        if (blogid) {
            Blog.findByIdAndRemove(blogid)
                .exec((err, blog) => {
                    if (err) {
                        return res.status(404)
                            .json(err);
                    }
                    res.status(204)
                        .json(null);
                })
        } else {
            res.status(404)
                .json({ message: "Blog does not exist" });
        }
    });
}

module.exports = {
    blogFetchAll,
    blogReadOne,
    blogCreate,
    blogUpdateOne,
    blogDeleteOne
}
