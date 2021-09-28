const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// config
require("dotenv").config();

// database connection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to db ✔️"))
  .catch(() => console.log("Error connecting to the database ❌"));

// middle wares |-> middle man for bunch-o  stuff
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/meetings", require("./routes/meeting"));
app.use("/api/auth", require("./routes/auth"));

// listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server running ⚡`);
});
