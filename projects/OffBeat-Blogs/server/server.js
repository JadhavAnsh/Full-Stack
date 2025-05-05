const express = require("express");
const bodyParser = require("body-parser");
const cookiePraser = require("cookie-parser")
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const blogRouter = require("./routes/blog.routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

function startServer() {
  try {
    // connecting to mongoDB Database
    mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("MongoDB connected!, DataBase name: " + mongoose.connection.db.databaseName)
  })
  .then(() => {
    // middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookiePraser());
    app.use(errorMiddleware);
  })
  .then(() => {
    // routes

    // Welcome route
    app.get("/", (req, res) => {
      res.send("Welcome to Offbeat Blogs API")
    })

    // auth routes
    app.use('/api/v1/auth', authRouter);

    // user routes
    app.use('/api/v1/users', userRouter);

    // blog routes
    app.use('/api/v1/blogs', blogRouter);
  })
  .then(() => {
    // listening to port
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

startServer()