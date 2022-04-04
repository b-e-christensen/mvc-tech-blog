const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const CommentBoard = require('./CommentBoard');


User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.belongsToMany(Comment, { through: CommentBoard})

Comment.belongsToMany(Post, { through: CommentBoard })

module.exports = { User, Post, Comment, CommentBoard };