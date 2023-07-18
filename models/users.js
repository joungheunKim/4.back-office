'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reservations, Reviews, Posts }) {
      // define association here
      // this.hasMany(Reservations, {
      //   foreignKey: 'User_id',
      //   onDelete: 'cascade',
      //   hooks: true,
      // });
      // this.hasMany(Reviews, {
      //   foreignKey: 'User_id',
      //   onDelete: 'cascade',
      //   hooks: true,
      // });
      // this.hasMany(Posts, {
      //   foreignKey: 'User_id',
      //   onDelete: 'cascade',
      //   hooks: true,
      // });
    }
  }
  Users.init(
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
      pet_name: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: 'Users',
    }
  );
  return Users;
};
