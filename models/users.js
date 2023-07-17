'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.posts, {
        sourceKey: 'user_id',
        foreignKey: 'User_id',
      });
      this.hasMany(models.reviews, {
        sourceKey: 'user_id',
        foreignKey: 'User_id',
      });
      this.hasMany(models.reservations, {
        sourceKey: 'user_id',
        foreignKey: 'User_id',
      });
    }
  }
  users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      login_id: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
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
      modelName: 'users',
    }
  );
  return users;
};
