const express = require("express");
const Userdata = require("./models/Userdata");
const Grpdata = require("./models/Grpdata");
const Msgdata = require("./models/Msgdata");
const app = new express();
//socket
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
// end of socket imports
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//socket
const bot = "ChatStation bot";
const formatMessage = require("./utils/message");

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", (grpuser) => {
    console.log(grpuser);
    user = {
      id: socket.id,
      username: grpuser.username,
      room: grpuser.room,
    };
    userJoin(user);
    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(bot, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(bot, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(bot, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});
//GET REQUESTS
app.get("/user/:id", (req, res) => {
  const userid = req.params.id;
  Userdata.findOne({ _id: userid }).then((user) => {
    res.send(user);
  });
});
app.get("/groups/:id", (req, res) => {
  const grpid = req.params.id;
  Grpdata.findOne({ _id: grpid }).then((group) => {
    res.send(group);
  });
});
app.get("/groups/msg/:id", (req, res) => {
  const grpid = req.params.id;
  Msgdata.findOne({ groupid: grpid }).then((grpchat) => {
    res.send(grpchat);
  });
});
app.get("/groups", (req, res) => {
  Grpdata.find().then(function (groups) {
    res.send(groups);
  });
});
app.get("/users", (req, res) => {
  Userdata.find().then(function (users) {
    res.send(users);
  });
});
app.get("/user/:id1/block/:id2", (req, res) => {
  const currentuser_id = req.params.id1;
  const vieweduser_id = req.params.id2;
  Userdata.findOne({ _id: currentuser_id })
    .then(function (currentuser) {
      Userdata.findOne({ _id: vieweduser_id })
        .then(function (vieweduser) {
          var blocked_user = {};
          blocked_user["username"] = vieweduser.username;
          blocked_user["id"] = vieweduser_id;
          currentuser.blocked.push(blocked_user);
          currentuser.save();
        })
        .catch(function (err) {
          console.log(err);
        });
      res.send({ currentuser: currentuser });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/user/:id1/mute/:id2", (req, res) => {
  const currentuser_id = req.params.id1;
  const vieweduser_id = req.params.id2;
  Userdata.findOne({ _id: currentuser_id })
    .then(function (currentuser) {
      Userdata.findOne({ _id: vieweduser_id })
        .then(function (vieweduser) {
          var muted_user = {};
          muted_user["username"] = vieweduser.username;
          muted_user["id"] = vieweduser_id;
          currentuser.muted.push(muted_user);
          currentuser.save();
        })
        .catch(function (err) {
          console.log(err);
        });
      res.send({ currentuser: currentuser });
    })
    .catch(function (error) {
      console.log(error);
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

//POST REQUESTS
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
      res.status(200).send({ token: token, id: user._id });
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
        res.status(200).send({ token: token, id: user._id });
      } else {
        res.status(401).send("Unauthorized request");
      }
    }
  );
});
app.post("/addgrp", verifyToken, function (req, res) {
  var group = {
    name: req.body.name,
    des: req.body.des,
    memno: req.body.memno,
    members: req.body.members,
  };
  var group = new Grpdata(group);
  group
    .save()
    .then(function () {
      var grpchat = {
        messages: [
          {
            sender: "ChatStation bot",
            time: "00:00",
            text: "New group",
          },
        ],
        groupid: group._id,
      };
      var grpchat = new Msgdata(grpchat);
      grpchat.save();
      res.status(200).send(group);
    })
    .catch(function (error) {
      console.log(error);
      res.status(401).send(error);
    });
});
app.post("/groups/:id/addmsg", function (req, res) {
  var grpid = req.params.id;
  grpid.toString();
  var message = {
    text: req.body.text,
    sender: req.body.sender,
    time: req.body.time,
  };
  Msgdata.findOne({ groupid: grpid })
    .then(function (grpchat) {
      grpchat.messages.push(message);
      grpchat.save();
    })
    .catch(function (err) {
      console.log(err);
    });
});
http.listen(5000, function () {
  console.log("Listening on port", 5000);
});
