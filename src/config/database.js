const mongoose = require("mongoose");
//Connecting to the Cluster

const connectDB = async () => {
  await mongoose
    .connect
    //add database connection string
    ();
};

module.exports = connectDB;
