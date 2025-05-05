const express = require('express');
const router = express.Router();
const { getUsers, getUser } = require('../controllers/user.controller');

// GET all users
router.get('/', getUsers);

// GET single user by ID
router.get('/:id', getUser);

module.exports = router;
