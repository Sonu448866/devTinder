const express = require("express");
require("./config/database");
const { connectDB } = require("./config/database");

const app = express();

//ensures that database connection is established before starting the server
connectDB()
  .then(() => {
    console.log("Database Connection Successful");
    app.listen(3000, () => {
      console.log("Server is running on PORT 3000");
    });
  })
  .catch((err) => {
    console.log(`Database Connection Fails:${err}`);
  });
