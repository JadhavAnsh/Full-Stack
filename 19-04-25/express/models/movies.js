const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],
        validate: {
            validator: function (value) {
                console.log("==", value);
                if (value.length === 0) {
                    return false;
                }
                return true;
            },
            message: "provide at least 1 cast member",
        },
    },
    year: {
        type: Number,
    },
    plot: {
        type: String,
    },
    director: {
        type: String,
    },
    genre: {
        type: String,
    },
    rating: {
        type: Number,
    },
    releaseDate: {
        type: Date,
    }
});

const MovieModule = mongoose.model("Movie", MovieSchema);
module.exports = MovieModule;