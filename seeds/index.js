const sequelize = require('../config/connection');

const { User, Comment, Post} =require('../models');

const userData = require('./userData.json');
const commentData= require('./commentSeeds.json');
const postData = require('./postSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Comment.bulkCreate(commentData);
  await Post.bulkCreate(postData);
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
