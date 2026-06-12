const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();

//Middleware to check if user is authorized .
//This middleware is only called for endpoints starting with /admin
app.use("/admin", adminAuth);
app.use("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllUser", (req, res) => {
  // Do db operation
  res.send("All data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  // Do db operation
  res.send("Deleted a User");
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
