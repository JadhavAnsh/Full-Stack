const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now(),
    },
});

CommentsSchema.index({ movieId: 1, email: 1 }, { unique: true });

const CommentsModule = mongoose.model("Comment", CommentsSchema);
module.exports = CommentsModule;