const express = require("express");
const mysql = require("mysql");
const myConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loginsystem",
});
//test the db connection
myConnection.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("database connected successfully");
  }
});

myConnection.query(
  "CREATE TABLE IF NOT EXISTS users(userid INT NOT NULL AUTO_INCREMENT, email VARCHAR(100), fullname VARCHAR(100), password VARCHAR(255), phone VARCHAR(20), PRIMARY KEY(userid));",
  (sqlerror, QRES) => {
    if (sqlerror) {
      console.log(sqlerror.message);
    } else {
      console.log("table created");
      //console.log(QRES);
    }
  }
);

const app = express();

app.get("/", (req, res) => {
  console.log(req.baseUrl);
  res.render("index.ejs");
});
app.get("/login", (req, res) => {
  //RECEIVE DATA FROM THE CLIENT
  //COMPARE CREDENTIALS WITH WHAT IS ON THE DB
  //IF THEY MATCH -- CREATE A SESSION
  res.render("login.ejs");
});
app.get("/signup", (req, res) => {
  //RECEIVE DATA from the frontend/client
  //INPUT VALIDATION
  //HASH THE PASSWORD
  //SAVE DATA ON THE DB
  console.log(req.path);
  res.render("signup.ejs");
});
app.get("/protectedRouteOne", (req, res) => {
  res.send("Only for logged in users!!");
});
app.get("/protectedRouteTwo", (req, res) => {
  res.send("Only for logged in users!");
});
app.get("/publicRouteOne", (req, res) => {
  res.send("for any visitors!");
});
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

//start/run
app.listen(5000, () => console.log("Server running on port 5000"));
