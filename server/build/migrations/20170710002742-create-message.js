'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups',
          key: 'id'
        }
      }
    });
  },
  down: function down(queryInterface /* , Sequelize */) {
    return queryInterface.dropTable('Messages');
  }
};
//# sourceMappingURL=20170710002742-create-message.js.map