DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(15),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT,
  roomname varchar(15),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  UserId int NULL,
  message varchar(200) NOT NULL,
  RoomId int NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (UserId) REFERENCES users (id),
  FOREIGN KEY (RoomId) REFERENCES rooms (id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

