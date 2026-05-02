const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const PORT = 3000;

const app = express(morgan("dev"));

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
