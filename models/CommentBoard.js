const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CommentBoard extends Model { }

CommentBoard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'comment',
              key: 'id',
            },
          },
          post_id: {
            type: DataTypes.INTEGER,
            references: {
               model: 'post',
               key: 'id',
              },
          },
    },
        {
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName: 'comment_board',
        }
)

module.exports = CommentBoard