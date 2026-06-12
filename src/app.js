const express = require("express");

const app = express();

//So first error should be handled so err is given as first parmeter

app.get("/getAllUser", (req, res) => {
  try {
    //Logic of DB call and get all user data
    throw new Error("Some Error");
    //res.send("User data sent");
  } catch (err) {
    res.status(500).send("Something Went Wrong contact team");
  }
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});
app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
