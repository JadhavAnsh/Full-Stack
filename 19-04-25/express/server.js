const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const movies = require("./models/movies");
const CommentsModule = require("./models/comments");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

function startApp() {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI, {

  })
    .then(() => {
      console.log("MongoDB connected, database is ready! Database name: " + mongoose.connection.db.databaseName);


      // Middleware
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      // Routes
      app.get("/greeting", (req, res) => {
        res.send("Hello, from server!");
      });

      // GET /movies
      app.get("/movies", (req, res) => {
        const db = mongoose.connection.db;
        db.collection("movies")
          .find()
          .limit(10)
          .toArray()
          .then((movies) => {
            res.status(200).json(movies);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });

      // POST /movies
      app.post("/movies", (req, res) => {
        const movieObject = req.body;
        const db = mongoose.connection.db;
        db.collection("movies")
          .insertOne(movieObject)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });

      // POST /movies to new collection
      app.post('/movies/new', (req, res) => {
        const movie = new movies(req.body);
        movies.create(movie)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });

      app.post('/comments', (req, res) => {
        const commentObject = req.body;
        const db = mongoose.connection.db;
        CommentsModule.create(commentObject)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => {
            res.status(422).json({ message: error.message });
          });
      });

      // Start the server
      app.listen(port, () => {
        console.log("Server is running on port " + port);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
}

startApp();
