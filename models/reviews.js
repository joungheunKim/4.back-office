'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Users, {
      //   targetKey: 'user_id',
      //   foreignKey: 'User_id',
      // });
      // this.belongsTo(models.Users, {
      //   targetKey: 'sitter_id',
      //   foreignKey: 'Sitter_id',
      // });
      // this.belongsTo(models.Users, {
      //   targetKey: 'nickname',
      //   foreignKey: 'Nickname',
      // });
    }
  }
  Reviews.init(
    {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
      },
      sitter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sitters',
          key: 'sitter_id',
        },
        onDelete: 'CASCADE',
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
      },
      rate: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Reviews',
    }
  );
  return Reviews;
};
