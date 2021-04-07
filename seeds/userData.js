const { User } = require('../models');

const userData = [
  {
    username:"Sal",
    email_username: "sal@hotmail.com",
    password: "password12345"
  },
  {
    username:"Len",
    email_username: "lernantino@gmail.com",
    password: "password12345"
  },
  {
    username:"Amiko",
    email_username: "amiko2k20@aol.com",
    password: "password12345"
  },
  {
    username:"Jordan",
    email_username: "jordan99@msn.com",
    password: "password12345"
  },
  {
    username:"Blake",
    email_username: "the_blake@yahoo.com",
    password: "password12345"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
