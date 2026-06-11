const express = require("express");

const app = express();

//Request Handler
app.use((req, res) => {
  res.send("Hello from server");
});

//Request Handler for /test
app.use("/test", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
