const express = require('express');
const userRouter = express.Router();

userRouter.get('/:id', (req, res) => {
    res.send( { title: `gets an user by their id: ${req.params.id}` })
})

userRouter.put('/:id', (req, res) => {
    res.send({ message: 'updates the user by their id' })
})

userRouter.delete('/:id', (req, res) => {
    res.send({ message: 'deletes the user by their id' })
})

module.exports = userRouter;