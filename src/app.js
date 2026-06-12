const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  try {
    //dummy data
    const userObj = {
      firstName: "Sonu",
      lastName: "Kumar",
      emailId: "kumarsonu448866@gmail.com",
      password: "Sonu123",
      age: 23,
      gender: "Male",
    };
    //creating a new instance of the User Model
    const user = new User(userObj);
    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

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
