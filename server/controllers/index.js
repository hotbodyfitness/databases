var models = require("../models");
var db = require("../db");

// SEQUELIZE refactor Completely removes the need for Server —> Models

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages

      // SEQUELIZE refactor
      db.Messages.findAll() // .findAll({include: [User]}) would Left Outer Join the Users table {join:}(would be inner join)
        .complete((err, data) => {
          res.json(data); // same as = res.send(JSON.stringify({ data }))
        });

      // models.messages.get((err, data) => { // THIS BLOCK was before refactor
      //   console.log("data: ", data);
      //   if (err) {
      //     console.log("Error from controllers.get :", err);
      //     // res.status(500);
      //     // res.send('We got an error 500!');
      //   } else {
      //     // res.status(200);
      //     // res.type("json");
      //     res.send(JSON.stringify({ data }));
      //   }
      // });
    },
    post: function (req, res) { // a function which handles posting a message to the database
      // SEQUELIZE refactor
      // .findOrCreate - will find the room if exists, or create it if it doesn't
      db.Users.findOrCreate({username: req.body.username}) // access to id from USERS table
        .complete((err, user) => {
          db.Rooms.findOrCreate({roomname: req.body.roomname}) // access to id from ROOMS table
            .complete((err, room) => {
              var obj = {
                userid: user.id,
                message: req.body.message,
                roomid: room.id
              };

              db.Messages.create(obj)
                .complete((err, data) => {
                  res.sendStatus(201);
                });
            });
        });

      // var obj = {                   // THIS BLOCK was before refactor
      //   username: req.body.username,
      //   message: req.body.message,
      //   roomname: req.body.roomname
      // };
      // models.messages.post(obj, (err, data) => {
      //   if (err) {
      //     console.log("Error from controllers.post :", err);
      //   } else {
      //     console.log("DATA :", data.message);
      //     res.sendStatus(201);
      //   }
      // });
    }
  },

  users: {
    get: function (req, res) {
      // SEQUELIZE refactor
      db.Users.findAll()
        .complete((err, data) => {
          res.json(data); // same as = res.send(JSON.stringify({ data }))
        });

      // models.users.get((err, data) => {
      //   // console.log("data: ", data);
      //   if (err) {
      //     console.log("Error from controllers.get :", err);
      //   } else {
      //     res.send(JSON.stringify({ data }));
      //   }
      // });
    },
    post: function (req, res) {
      // SEQUELIZE refactor
      db.Users.create({username: req.body.username})
        .complete((err, data) => {
          res.sendStatus(201);
        });

      // var obj = {
      //   username: req.body.username
      // };
      // console.log("POST Request.body :", req.body);
      // models.users.post(obj, (err, data) => {
      //   if (err) {
      //     console.log("Error from controllers.post :", err);
      //   } else {
      //     res.sendStatus(201);
      //   }
      // });
    }
  }
};
