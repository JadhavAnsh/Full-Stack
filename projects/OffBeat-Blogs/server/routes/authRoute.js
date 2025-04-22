const express = require('express');
const authRouter = express.Router();

authRouter.post('/sign-in', (req, res) => {
    res.send( { title: 'log-in' })
})

authRouter.post('/sign-up', (req, res) => {
    res.send({ message: 'sign-up' })
})

authRouter.post('/sign-out', (req, res) => {
    res.send({ message: 'sign-out' })
})

module.exports = authRouter;