const sequelize = require('../config/connection');

const { User, Comment, Post} =require('../models');

const userData = require('./userData');
const commentData= require('./commentSeeds');
const postData = require('./postSeeds');
const seedComments = require('./commentSeeds');
const seedPosts = require('./postSeeds');
const seedUsers = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedComments();
  await seedPosts();
  await seedUsers({
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
