'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      User_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
      },
      Sitter_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sitters',
          key: 'sitter_id',
        },
        onDelete: 'CASCADE',
      },
      User_nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'nickname',
        },
        onDelete: 'CASCADE',
      },
      Sitter_nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Sitters',
          key: 'nickname',
        },
        onDelete: 'CASCADE',
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  },
};
