// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// SEQUELIZE refactor
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

var Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING
});
var Messages = db.define('Messages', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  message: Sequelize.STRING,
  roomid: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'id'
    }
  },
  userid: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});
var Rooms = db.define('Rooms', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  roomname: Sequelize.STRING
});

// this is how FOREIGN KEYS are defined
Users.hasMany(Messages);
Rooms.hasMany(Messages);
Messages.belongsTo(Users, { foreignKey: 'userid' });
Messages.belongsTo(Rooms, { foreignKey: 'roomid' });

// Syncronize these Sequelize var's
Users.sync();
Messages.sync();
Rooms.sync();

// the following 6 lines are just there to verify that the connection works
db.authenticate()
  .then(() => {
    console.log('SEQUELIZE Connection has been established successfully.');
  })
  .catch(err => {
    console.error('SEQUELIZE Unable to connect to the database:', err);
  });

module.exports.Users = Users;
module.exports.Messages = Messages;
module.exports.Rooms = Rooms;

// FOLLOWING lines were for mysql without Sequelize - no longer needed
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat'
// });
// connection.connect();

// module.exports = connection;