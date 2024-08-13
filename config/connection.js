const { connect, connection } = require("mongoose");

// the URL for connecting to the MongoDB database
const connectionString = "mongodb://127.0.0.1:27017/SocialSparkDB";

// connect to the database using the URL
connect(connectionString);

// make the connection object available to other parts of the app
module.exports = connection;

// log a message when successfully connected to the database
connection.on("connected", () => {
  console.log("Mongoose connected to the database.");
});
// log any errors that occur during the connection
connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});
// log a message if the connection to the database is lost
connection.on("disconnected", () => {
  console.log("Mongoose disconnected from the database.");
});