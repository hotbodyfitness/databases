var mysql = require('mysql');
// SEQUELIZE refactor
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// for var mysql - no longer used
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});
// connection.connect();


// the following 6 lines are just there to verify that the connection works
db.authenticate()
  .then(() => {
    console.log('SEQUELIZE Connection has been established successfully.');
  })
  .catch(err => {
    console.error('SEQUELIZE Unable to connect to the database:', err);
  });

module.exports = db;

// for var mysql - no longer used
// module.exports = connection;

