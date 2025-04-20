const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => console.log("MongoDB connected!, DataBase name: " + mongoose.connection.db.databaseName))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
