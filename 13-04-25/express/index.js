const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Notes = require('./models/notes');
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONG_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
const port = process.env.PORT || 3000;

app.get('/notes', async (req, res) => {
    const notesList = await Notes.find().then((notes) => {
        return notes;
    });
    res.json(notesList);
});

app.post('/notes', async (req, res) => {
    const note = await Notes.create(req.body);
    res.status(201).json(note);
});

app.get('/notes/:id', async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ message: 'Notes not found' });
    }
    return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.put('/notes/:id', async (req, res) => {
    try {
        const note = await Notes.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true
            });
    if (!note) {
        return res.status(404).json({ message: 'Notes not found' });
    }
    return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) {
        return res.status(404).json({ message: 'Notes not found' });
    }
    res.status(204).json({ message: 'Notes deleted successfully' });
    return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.delete('/notes', async (req, res) => {
    try {
        await Notes.deleteMany();
        return res.status(204).json({ message: 'All notes deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});