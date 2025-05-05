const mongoose = require('mongoose');
const Blog = require('../models/blog.model.js');

const getBlogs = (req, res) => {
    Blog.find().sort({ _id: -1 })
        .then((blogs) => res.status(200).json(blogs))
        .catch((error) => res.status(404).json({ message: error.message }));
};

const getBlog = (req, res) => {
    const { id } = req.params;

    Blog.findById(id)
        .then((blog) => {
            if (!blog) return res.status(404).json({ message: 'Blog not found' });
            res.status(200).json(blog);
        })
        .catch((error) => res.status(404).json({ message: error.message }));
};

const createBlog = (req, res) => {
    const blog = new Blog({ ...req.body, createdAt: new Date().toISOString() });

    blog.save()
        .then((savedBlog) => res.status(201).json(savedBlog))
        .catch((error) => res.status(409).json({ message: error.message }));
};

const updateBlog = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No blog with id: ${id}`);

    Blog.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedBlog) => res.json(updatedBlog))
        .catch((error) => res.status(400).json({ message: error.message }));
};

const deleteBlog = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No blog with id: ${id}`);

    Blog.findByIdAndRemove(id)
        .then(() => res.json({ message: 'Blog deleted successfully' }))
        .catch((error) => res.status(400).json({ message: error.message }));
};

const likeBlog = (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId)
        return res.status(401).json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No blog with id: ${id}`);

    Blog.findById(id)
        .then((blog) => {
            const index = blog.likes.findIndex((id) => id === String(userId));

            if (index === -1) {
                blog.likes.push(userId);
            } else {
                blog.likes = blog.likes.filter((id) => id !== String(userId));
            }

            Blog.findByIdAndUpdate(id, blog, { new: true })
                .then((updatedBlog) => res.json(updatedBlog))
                .catch((error) => res.status(400).json({ message: error.message }));
        })
        .catch((error) => res.status(404).json({ message: error.message }));
};

const getLikes = (req, res) => {
    const { id } = req.params;

    Blog.findById(id)
        .then((blog) => res.json({ likes: blog.likes }))
        .catch((error) => res.status(404).json({ message: error.message }));
};

const commentBlog = (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    Blog.findById(id)
        .then((blog) => {
            blog.comments.push(value);
            Blog.findByIdAndUpdate(id, blog, { new: true })
                .then((updatedBlog) => res.json(updatedBlog))
                .catch((error) => res.status(400).json({ message: error.message }));
        })
        .catch((error) => res.status(404).json({ message: error.message }));
};

const getComments = (req, res) => {
    const { id } = req.params;

    Blog.findById(id)
        .then((blog) => res.json({ comments: blog.comments }))
        .catch((error) => res.status(404).json({ message: error.message }));
};

const deleteComments = (req, res) => {
    const { id } = req.params;

    Blog.findById(id)
        .then((blog) => {
            blog.comments = [];
            Blog.findByIdAndUpdate(id, blog, { new: true })
                .then((updatedBlog) => res.json(updatedBlog))
                .catch((error) => res.status(400).json({ message: error.message }));
        })
        .catch((error) => res.status(404).json({ message: error.message }));
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    getLikes,
    commentBlog,
    getComments,
    deleteComments,
};
