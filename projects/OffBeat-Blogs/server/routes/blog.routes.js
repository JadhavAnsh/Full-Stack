const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/blog.controller.js');

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Create / Update / Delete
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

// Likes
router.patch('/:id/like', likeBlog);
router.get('/:id/likes', getLikes);

// Comments
router.post('/:id/comment', commentBlog);
router.get('/:id/comments', getComments);
router.delete('/:id/comments', deleteComments);

module.exports = router;
