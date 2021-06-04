const express = require("express");
const Userdata = require("./models/Userdata");
const Grpdata = require("./models/Grpdata");
const app = new express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  Userdata.findOne({ username: username }).then((user) => {
    res.send(user);
  });
});
app.get("/groups", (req, res) => {
  Grpdata.find().then(function (groups) {
    res.send(groups);
  });
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

app.post("/signup", (req, res) => {
  var newuser = {
    username: req.body.uname,
    email: req.body.email,
    password: req.body.pw,
  };
  var user = new Userdata(newuser);
  user
    .save()
    .then(function () {
      let payload = {
        subject: newuser.username + newuser.email + newuser.password,
      };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    })
    .catch(function (error) {
      res.status(401).send("Unauthorized request");
    });
});
app.post("/login", (req, res) => {
  let username = req.body.uname;
  let password = req.body.pw;
  Userdata.findOne(
    {
      $and: [{ username: username }, { password: password }],
    },
    function (err, user) {
      if (user) {
        let payload = { subject: username };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      } else {
        res.status(401).send("Unauthorized request");
      }
    }
  );
});
app.post("/addgrp", verifyToken, function (req, res) {
  var group = {
    name: req.body.group.name,
    des: req.body.group.des,
    memno: req.body.group.memno,
    members: req.body.group.members,
  };
  var group = new Grpdata(group);
  group.save();
});
app.listen(5000, function () {
  console.log("Listening on port", 5000);
});
