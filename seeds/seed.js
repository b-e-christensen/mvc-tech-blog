const sequelize = require('../config/connection');
const { User, Post, Comment, CommentBoard } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const commentBoardData = require('./commentBoardData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
      returning: true
  })

  const comments = await Comment.bulkCreate(commentData, {
    returning: true
})

  const commentBoard = await CommentBoard.bulkCreate(commentBoardData, {
    returning: true
  })

  process.exit(0);
};

seedDatabase();
