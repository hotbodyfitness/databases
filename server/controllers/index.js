var models = require("../models");

module.exports = {
  messages: {
    get: function(req, res) {
      // a function which handles a get request for all messages
      models.messages.get((err, data) => {
        console.log("data: ", data);
        // console.log("response: ", res);
        if (err) {
          console.log("Error from controllers.get :", err);
          // res.status(500);
          // res.send('We got an error 500!');
        } else {
          res.status(200);
          res.type("json");
          res.send(JSON.stringify({ data }));
        }
      });
    },
    post: function(req, res) {
      // a function which handles posting a message to the database
      var obj = {
        username: req.body.username,
        message: req.body.message,
        roomname: req.body.roomname
      };
      // console.log("POST Request :", req);
      console.log("POST Request.body :", req.body);
      models.messages.post(obj, (err, data) => {
        if (err) {
          console.log("Error from controllers.post :", err);
        } else {
          res.status(201);
          res.type("json");
          res.send(JSON.stringify(data));
        }
      });
    }
  },

  users: {
    // Ditto as above
    get: function(req, res) {
      models.users.get((err, data) => {
        console.log("data: ", data);
        // console.log("response: ", res);
        if (err) {
          console.log("Error from controllers.get :", err);
          // res.status(500);
          // res.send('We got an error 500!');
        } else {
          res.status(200);
          res.type("json");
          res.send(JSON.stringify({ data }));
        }
      });
    },
    post: function(req, res) {
      var obj = {
        username: req.body.username,
        message: req.body.message,
        roomname: req.body.roomname
      };
      // console.log("POST Request :", req);
      console.log("POST Request.body :", req.body);
      models.users.post(obj, (err, data) => {
        if (err) {
          console.log("Error from controllers.post :", err);
        } else {
          res.status(201);
          res.type("json");
          res.send(JSON.stringify(data));
        }
      });
    }
  }
};
