/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;
var Sequelize = require('sequelize');

describe('Persistent Node Chat Server', function () {
  var dbConnection;
  var db;

  beforeEach(function (done) {
    db = new Sequelize('chat', 'root', '');

    dbConnection = mysql.createConnection({
      // FIXME: Do we need to change the user and password to our own user (root) and password?
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out // DONE

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
    // dbConnection.query('DELETE FROM users');
    // dbConnection.query('DELETE FROM rooms', done);
  });

  afterEach(function () {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function (done) {
    // Post the user to the chat server.
    request(
      {
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'Valjean' }
      },
      function () {
        // Post a message to the node chat server:
        request(
          {
            method: 'POST',
            uri: 'http://127.0.0.1:3000/classes/messages',
            json: {
              username: 'Valjean',
              message: "In mercy's name, three days is all I need.",
              roomname: 'Hello'
            }
          },
          function () {
            // Now if we look in the database, we should find the
            // posted message there.

            db.query('SELECT * FROM messages')
              .then(results => {
                console.log('****************************', results[0]);
                expect(results[0][0].message).to.equal(
                  "In mercy's name, three days is all I need."
                );
                done();
              });
            // var queryString = 'SELECT * FROM messages';
            // var queryArgs = [];
            // dbConnection.query(queryString, queryArgs, function(err, results) {
            //   console.log('*************** this is results', results);
            //   // Should have one result:
            //   expect(results.length).to.equal(1);

            //   // TODO: If you don't have a column named text, change this test.
            //   expect(results[0].message).to.equal(
            //     "In mercy's name, three days is all I need."
            //   );

            //   done();
            // });
          }
        );
      }
    );
  });

  it('Should output all messages from the DB', function (done) {
    // Let's insert a message into the db
    // TODO - The exact query string and query args to use

    var queryStr2 = 'INSERT INTO messages (message, userid, roomid) VALUES (Here is our Text, (SELECT id FROM users WHERE username = Valjean), (SELECT id FROM rooms WHERE roomname = Hello))';
    db.query(queryStr2)
      .then(results => {
        console.log('RESULTS TEST 2 ****************: ', results);
        request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
          var messageLog = JSON.parse(body);
          console.log('messageLog from TEST: ', messageLog);
          expect(messageLog.data[0].message).to.equal('Here is our Text');
          expect(messageLog.data[0].roomid).to.equal(1);

          done();
        });
      });
    //   var queryString =
    //   'INSERT INTO messages (message, userid, roomid) VALUES (?, (SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?))';
    // var queryArgs = ['Here is our Text', 'Valjean', 'Hello'];
    // dbConnection.query(queryString, queryArgs, function(err, results) {
    //   if (err) {
    //     console.log('RESULTS ERR from ServerSpec line 109: ', results);
    //     throw err;
    //   }

    //   // Now query the Node chat server and see if it returns
    //   // the message we just inserted:
    //   request('http://127.0.0.1:3000/classes/messages', function(
    //     error,
    //     response,
    //     body
    //   ) {
    //     var messageLog = JSON.parse(body);
    //     console.log('messageLog from TEST: ', messageLog);
    //     expect(messageLog.data[0].message).to.equal('Here is our Text');
    //     expect(messageLog.data[0].roomid).to.equal(1);

    //     done();
    //   });
    // });
  });
});
