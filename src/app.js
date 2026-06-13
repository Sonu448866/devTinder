const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//middleware (converts JSON obj to Javascript Obj)
app.use(express.json());

app.post("/signup", async (req, res) => {
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

  try {
    //creating a new instance of the User Model
    const user = new User(userObj);
    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//Getting data from email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
});

//Get all user from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //no filter added
    if (users.lenght == 0) {
      res.send("No user Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Some Error is Occured");
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
