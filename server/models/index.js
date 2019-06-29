var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {  // a function which produces all the messages
      var queryString = `SELECT * FROM messages`;
      db.query(queryString, (err, results) => {
        if (err) {
          // callback(err, null);
          console.log('Error from models.messages.get :', err);
        } else {
          // console.log('results :', results)
          callback(null, results);
        }
      });
    },

    post: function (obj, callback) { // a function which can be used to insert a message into the database
      var useruid;

      db.query(`SELECT u.id FROM users u WHERE u.username = ${obj.username}`, (err, results) => {
        useruid = results;
        console.log('******useruid****** :', useruid);
      });
      console.log('useruid :', useruid);

      // var queryString = `INSERT INTO messages (message, userid) VALUES (?, ?)`;
      // var queryArgs = [obj.message, `SELECT u.id FROM users u WHERE u.username = ${obj.username}`];

      db.query(queryString, queryArgs, (err, results) => {
        if (err) {
          console.log('Error from models.messages.post :', err);
        } else {
          console.log('models-POST results :', results);
          callback(null, results);
        }
      });
    }


  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryString = `SELECT username FROM users`;
      db.query(queryString, (err, results) => {
        if (err) {
          // callback(err, null);
          console.log('Error from models.users.get :', err);
        } else {
          // console.log('results :', results)
          callback(null, results);
        }
      });
    },
    post: function (obj, callback) {
      var queryString = `INSERT INTO users (username) VALUES (?)`;
      var queryArgs = [obj.username];
      db.query(queryString, queryArgs, (err, results) => {
        if (err) {
          console.log('Error from models.users.post :', err);
        } else {
          // console.log('results :', results);
          callback(null, results);
        }
      });
    }
  }
};

