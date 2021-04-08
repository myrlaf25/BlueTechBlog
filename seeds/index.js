const sequelize = require('../config/connection');

const { User, Comment, Post} =require('../models');

const userSeeds = require('./userData');
const commentSeeds= require('./commentSeeds');
const postSeeds = require('./postSeeds');
// const seedComments = require('./commentSeeds');
// const seedPosts = require('./postSeeds');
// const seedUsers = require('./userData');

const seedDatabase = async () => {
    try{
  await sequelize.sync({ force: true });
  await commentSeeds();
  console.log('\n----- COMMENTS -DATABASE SYNCED -----\n');
  await postSeeds();
  console.log('\n----- POSTS -DATABASE SYNCED -----\n');
  await userSeeds({
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS -DATABASE SYNCED -----\n');
} catch (err){
      console.log(err);
  }
  process.exit(0);
};

seedDatabase();
