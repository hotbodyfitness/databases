var db = require('../db');

module.exports = {
  messages: {
    get: function (request, response) {  // a function which produces all the messages
      models.messages.get((err, data) => {
        console.log('data: ', data);
        console.log('response: ', response);
        if (err) {
          response.status(500);
          response.send('We got an error 500!');
        } else {
          response.status(200);
          response.type('json');
          response.send(JSON.stringify({data}));
        }
      });
    },

    post: function (request, response) {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

