const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//middleware (converts JSON obj to Javascript Obj)
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //taking data from body
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const userObj = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
      age: age,
      gender: gender,
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
