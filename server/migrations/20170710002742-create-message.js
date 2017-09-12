module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      readBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        },
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id',
          as: 'groupId'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('Messages'),
};
