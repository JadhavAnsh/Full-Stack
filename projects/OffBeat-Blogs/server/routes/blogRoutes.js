const express = require('express');
const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
    res.send( { title: 'gets all blogs' })
})

blogRouter.get('/:id', (req, res) => {
    res.send({ message: 'gets blog by their id' })
})

blogRouter.post('/', (req, res) => {
    res.send({ message: 'creates a new blog' })
})

blogRouter.put('/:id', (req, res) => {
    res.send({ message: 'updates blog by their id' })
})

blogRouter.delete('/:id', (req, res) => {
    res.send({ message: 'deletes blog by their id' })
})

blogRouter.post('/:id/like', (req, res) => {
    res.send({ message: 'likes blog by their id' })
})

blogRouter.get('/:id/likes', (req, res) => {
    res.send({ message: 'gets likes of blog by their id' })
})

blogRouter.post('/:id/comment', (req, res) => {
    res.send({ message: 'comments blog by their id' })
})

blogRouter.get('/:id/comments', (req, res) => {
    res.send({ message: 'gets comments of blog by their id' })
})

blogRouter.delete('/:id/comments', (req, res) => {
    res.send({ message: 'deletes comments of blog by their id' })
})

module.exports = blogRouter;