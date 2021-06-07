// console.log("hello");
const express = require("express");
const fs = require("fs");
const app = express();
const cron = require("node-cron");
app.use(express.json());
const jwt = require("jsonwebtoken");
const Table = require("./schema.js");
require("./db");

app.listen(3000, () => {
  console.log("the server is up and running");
});

//save users details ...

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = new Table({ name, email });
  await user.save();
  res
    .status(201)
    .json({ message: "User saved to database(created) succesfully" });
});

var current = new Date();
var time = current.toLocaleString();
console.log(current);
// Schedule tasks to be run on the server.
//after every one minute our data will get appended to our txt file  above
function printinnewfile() {
  cron.schedule("* * * * * *", function () {
    // console.log("running a task every minute");
    fs.appendFile("example_file.txt", "\n", (err) => {
      if (err) {
        throw err;
      }
    });
    fs.appendFile(
      "example_file.txt",
      "Current time \n " + time,
      function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      }
    );
  });
}
//syntax fs.appendFile( path, data[, options], callback )

printinnewfile();

///creating of jwt token below
app.post("/api/creatingtoken", function (req, res) {
  //auth user
  const user = req.body;
  const token = jwt.sign({ user }, "my_secret_key");
  res.json({
    token,
  });
  console.log(token);
});

///validating our token...
app.post("/api/protected", ensureToken, (req, res) => {
  jwt.verify(req.token, "my_secret_key", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "True",
        // message: authData,
      });
    }
  });
});

//our ensure function for validation...
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}
