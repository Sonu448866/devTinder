const express = require("express");

const app = express();

app.use("/user", [
  (req, res, next) => {
    console.log("Handling the route user1");

    next();
  },
  (req, res, next) => {
    console.log("Handling the route user2");
    // res.send("Response2");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user3");
    res.send("Response3");
    // next();
  },
]);

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
