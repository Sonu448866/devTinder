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
    if (users.length == 0) {
      res.send("No user Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Some Error is Occured");
  }
});

//finding user by ID
app.get("/user/:ID", async (req, res) => {
  const userId = req.params.ID;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.send("User not Found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went Wrong" + err.message);
  }
});

//Finding user by Id and delete it
app.delete("/user", async (req, res) => {
  {
    const userId = req.body.userId;
    try {
      // const user = await User.findByIdAndDelete({ _id: userId });
      //Above and below lines infer the same
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        res.status(200).send("User not Found");
      } else {
        res.status(200).send("User deleted Successfully");
      }
    } catch (err) {
      res.status(400).send("Something went Wrong");
    }
  }
});

//Update the document
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true, //it enables to run validate fn mentioned in schema
    });
    if (!user) {
      res.status(200).send("User not Found");
    } else {
      res.send("User Updated successfully");
    }
  } catch (err) {
    res.status(400).send("Something went Wrong" + err.message);
  }
});

//ensures that database connection is established before starting the server
connectDB()
  .then(async () => {
    console.log("Database Connection Successful");
    await User.syncIndexes();
    app.listen(3000, () => {
      console.log("Server is running on PORT 3000");
    });
  })
  .catch((err) => {
    console.log(`Database Connection Fails:${err}`);
  });
